import { createContext, useState, useCallback, useEffect, useMemo, useContext } from 'react';
import * as userService from '../api/user/user.service';
import config from '../config.json';
import * as axios from '../api';
import { Buffer } from 'buffer';
import { LoginDataDto } from '../api/user/model/login.data.dto';
import { UserRegisterDto } from '../api/user/model/user.register.dto';
import { User } from '../api/user/model/user.model';

const JWT_TOKEN_KEY = config.token_key;
const AuthContext: React.Context<any> = createContext(null);
const useAuth = () => useContext(AuthContext);

export const useSession = () => {
	const { loading, token, user, ready, error, isAuthed, hasRoles } = useAuth();
	return { loading, token, user, ready, error, isAuthed, hasRoles };
};

export const useLogin = () => {
	const { login } = useAuth();
	return login;
};

export const useRegister = () => {
	const { register } = useAuth();
	return register;
};

export const useLogout = () => {
	const { logout } = useAuth();
	return logout;
};

function parseJwt(token) {
	if (!token) return {};
	const base64Url = token.split('.')[1];
	const payload = Buffer.from(base64Url, 'base64');
	const jsonPayload = payload.toString('ascii');
	return JSON.parse(jsonPayload);
}

function parseExp(exp) {
	if (!exp) return null;
	if (typeof exp !== 'number') exp = Number(exp);
	if (isNaN(exp)) return null;
	return new Date(exp * 1000);
}


export const AuthProvider = ({
	children,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [token, setToken] = useState<string>(localStorage.getItem(JWT_TOKEN_KEY));
	const [isAuthed, setAuthed] = useState<boolean>(false);
	const [hasRoles, setRoles] = useState<string[]>([]);
	const [user, setUser] = useState<User>(null);
	const [ready, setReady] = useState<boolean>(false);

	useEffect(() => {
		setReady(Boolean(token));
		axios.setAuthToken(token);
		if (token) {
			localStorage.setItem(JWT_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(JWT_TOKEN_KEY)
		}
	}, [token]);

	const setSession = useCallback((token: string, user: User) => {
		const { exp } = parseJwt(token);
		const expiry = parseExp(exp);
		const stillValid: boolean = expiry >= new Date();

		if (stillValid) {
			localStorage.setItem(JWT_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(JWT_TOKEN_KEY);
			token = null;
		}

		axios.setAuthToken(token);
		setToken(token);
		if (user) {
			setUser(user)
			setRoles(user.roles)
		}
		else
			setRoles([])
		setReady(stillValid);
	}, []);

	const login = useCallback(async (data: LoginDataDto) => {
		try {
			setLoading(false);
			setError('');
			const { token, user } = await userService.login(data);
			setSession(token, user);
			setAuthed(true);
			return true;
		} catch (error) {
			console.error(error);
			setError(error.response.data.message);
			return false;
		} finally {
			setLoading(false);
		}
	}, [setSession]);

	const register = useCallback(async (data: UserRegisterDto) => {
		try {
			setLoading(false);
			setError('');
			const { token, user } = await userService.register(data);
			setSession(token, user);
			setAuthed(true);
			return true;
		} catch (error) {
			console.error(error);
			console.log(error.response.data.message);
			
			setError(error.response.data.message);
			return false;
		} finally {
			setLoading(false);
		}
	}, [setSession]);

	const logout = useCallback(() => {
		setSession(null, null);
		setAuthed(false);
	}, [setSession]);

	const value = useMemo(() => ({
		token,
		user,
		ready,
		error,
		loading,
		isAuthed,
		hasRoles,
		login,
		logout,
		register
	}), [token, user, error, loading, login, logout, register, ready, isAuthed, hasRoles]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

