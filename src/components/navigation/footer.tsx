import React from "react"

export default function Footer() {
  
  return (
  <footer cy-data='footer' className="bg-dark text-light page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Game Nerd</h5>
                <p>Uw number one site voor gaming nieuws en reviews</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>


            <div className="col-md-6 mb-md-0 mb-3">
                <h5 className="text-uppercase">Gegevens</h5>
                <ul className="list-unstyled">
                    <li>GameNerd BVBA</li>
                    <li>Straatnaam 123</li>
                    <li>Postcode Gemeente</li>
                    <li>BTW: BE123456789</li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 Copyright: <br></br>
        <a href="dezelinkwerktniet">Zetta Software</a>
    </div>

</footer>)

}