export class TestResponses {
  public static readonly LOGIN_RESPONSE_ADMIN = {
    statusCode: 200,
    body: {
      user: {
        id: "1",
        name: "admin",
        roles: [
          "ADMIN",
          "WRITER"
        ]
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZXMiOlsiQURNSU4iLCJXUklURVIiXSwiaWF0IjoxNjY3NDA0MzExLCJleHAiOjE2Njc0MDc5MTEsImF1ZCI6ImdhbWUubmVyZC5iZSIsImlzcyI6ImdhbWUubmVyZC5iZSIsInN1YiI6ImF1dGgifQ.SiXL5xWCQrd08uW8jYFTPDPrIrim05ICMoUyIsV0tWs"
    }
  }

  public static readonly LOGIN_RESPONSE_WRITER = {
    statusCode: 200,
    body: {
      user: {
        id: "2",
        name: "writer",
        roles: [
          "WRITER"
        ]
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZXMiOlsiQURNSU4iLCJXUklURVIiXSwiaWF0IjoxNjY3NDA0MzExLCJleHAiOjE2Njc0MDc5MTEsImF1ZCI6ImdhbWUubmVyZC5iZSIsImlzcyI6ImdhbWUubmVyZC5iZSIsInN1YiI6ImF1dGgifQ.SiXL5xWCQrd08uW8jYFTPDPrIrim05ICMoUyIsV0tWs"
    }
  }

  public static readonly LOGIN_RESPONSE_USER = {
    statusCode: 200,
    body: {
      user: {
        id: "3",
        name: "user",
        roles: [
        ]
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZXMiOlsiQURNSU4iLCJXUklURVIiXSwiaWF0IjoxNjY3NDA0MzExLCJleHAiOjE2Njc0MDc5MTEsImF1ZCI6ImdhbWUubmVyZC5iZSIsImlzcyI6ImdhbWUubmVyZC5iZSIsInN1YiI6ImF1dGgifQ.SiXL5xWCQrd08uW8jYFTPDPrIrim05ICMoUyIsV0tWs"
    }
  }

  public static readonly GAME_RESPONSE = {
    "id": "1",
    "name": "Devil May Cry 3: Dante's Awakening",
    "boxart": "https://www.mobygames.com/images/covers/l/48031-devil-may-cry-3-dante-s-awakening-playstation-2-front-cover.jpg"
  }

  public static readonly GAMES_ALL_RESPONSE = {
    statusCode: 200,
    body: [
      {
        "id": "1",
        "name": "Devil May Cry 3: Dante's Awakening",
        "boxart": "https://www.mobygames.com/images/covers/l/48031-devil-may-cry-3-dante-s-awakening-playstation-2-front-cover.jpg"
      },
      {
        "id": "2",
        "name": "Bayonetta 2",
        "boxart": "https://www.mobygames.com/images/covers/l/467682-bayonetta-bayonetta-2-special-edition-wii-u-front-cover.jpg"
      },
      {
        "id": "3",
        "name": "Devil May Cry 5",
        "boxart": "https://www.mobygames.com/images/covers/l/546432-devil-may-cry-5-playstation-4-front-cover.jpg"
      },
      {
        "id": "4",
        "name": "Metal Gear Rising: Revengeance",
        "boxart": "https://www.mobygames.com/images/covers/l/280542-metal-gear-rising-revengeance-windows-front-cover.jpg"
      },
      {
        "id": "916423bf-9343-4838-bd92-15c01afe5fdb",
        "name": "Devil May Cry 4",
        "boxart": "https://www.mobygames.com/images/covers/l/106399-devil-may-cry-4-playstation-3-front-cover.jpg"
      }
    ]
  }

  public static readonly USERS_ALL_RESPONSE = {
    statusCode: 200,
    body: [
      {
        id: "1",
        name: "admin",
        roles: ["ADMIN", "WRITER"]
      },
      {
        id: "2",
        name: "writer",
        roles: ["WRITER"]
      },
      {
        id: "3",
        name: "user",
        roles: ["USER"]
      },
    ]
  }

  public static readonly USER_RESPONSE = {
    statusCode: 200,
    body:
    {
      id: "3",
      name: "user",
      roles: ["USER"]
    }
  }

  public static readonly ADMIN_RESPONSE = {
    statusCode: 200,
    body:
    {
      id: "1",
      name: "admin",
      roles: ["ADMIN", "WRITER"]
    }
  }

  public static readonly WRITER_RESPONSE = {
    statusCode: 200,
    body:
    {
      id: "2",
      name: "writer",
      roles: ["WRITER"]
    }
  }

  public static readonly NEWS_ALL_RESPONSE = {
    statusCode: 200,
    body: [
      {
        "id": "1",
        "writer": {
          "id": "1",
          "name": "admin"
        },
        "content": "Dante is cool enzo",
        "game": {
          "id": "1",
          "name": "Devil May Cry 3: Dante's Awakening",
          "boxart": "https://www.mobygames.com/images/covers/l/48031-devil-may-cry-3-dante-s-awakening-playstation-2-front-cover.jpg"
        }
      },
      {
        "id": "2",
        "writer": {
          "id": "2",
          "name": "writer"
        },
        "content": "Nieuws over game 2",
        "game": {
          "id": "2",
          "name": "Bayonetta 2",
          "boxart": "https://www.mobygames.com/images/covers/l/467682-bayonetta-bayonetta-2-special-edition-wii-u-front-cover.jpg"
        }
      },
      {
        "id": "3",
        "writer": {
          "id": "1",
          "name": "admin"
        },
        "content": "test test test",
        "game": {
          "id": "2",
          "name": "Bayonetta 2",
          "boxart": "https://www.mobygames.com/images/covers/l/467682-bayonetta-bayonetta-2-special-edition-wii-u-front-cover.jpg"
        }
      },
    ]
  }

  public static readonly NEWS_RESPONSE = {
    statusCode: 200,
    body:
    {
      "id": "1",
      "writer": {
        "id": "1",
        "name": "admin"
      },
      "content": "Dante is cool enzo",
      "game": {
        "id": "1",
        "name": "Devil May Cry 3: Dante's Awakening",
        "boxart": "https://www.mobygames.com/images/covers/l/48031-devil-may-cry-3-dante-s-awakening-playstation-2-front-cover.jpg"
      }
    }
  }


  public static readonly REVIEWS_ALL_RESPONSE = [
    {
      "id": "1",
      "score": 5,
      "writer": {
        "id": "1",
        "name": "admin"
      },
      "content": "Tweede poging",
      "game": {
        "id": "4",
        "name": "Metal Gear Rising: Revengeance",
        "boxart": "https://www.mobygames.com/images/covers/l/280542-metal-gear-rising-revengeance-windows-front-cover.jpg"
      }
    },
    {
      "id": "2",
      "score": 7,
      "writer": {
        "id": "2",
        "name": "writer"
      },
      "content": "Review van game 2",
      "game": {
        "id": "2",
        "name": "Bayonetta 2",
        "boxart": "https://www.mobygames.com/images/covers/l/467682-bayonetta-bayonetta-2-special-edition-wii-u-front-cover.jpg"
      }
    },
    {
      "id": "23f389c1-e135-487d-b65e-bda2b7f87ab2",
      "score": 8,
      "writer": {
        "id": "1",
        "name": "admin"
      },
      "content": "Devil May Cry 4 is best wel cool",
      "game": {
        "id": "916423bf-9343-4838-bd92-15c01afe5fdb",
        "name": "Devil May Cry 4",
        "boxart": "https://www.mobygames.com/images/covers/l/106399-devil-may-cry-4-playstation-3-front-cover.jpg"
      }
    }
  ]

  public static readonly REVIEW_RESPONSE = {
    statusCode: 200,
    body:
    {
      "id": "1",
      "score": 5,
      "writer": {
        "id": "1",
        "name": "admin"
      },
      "content": "Tweede poging",
      "game": {
        "id": "4",
        "name": "Metal Gear Rising: Revengeance",
        "boxart": "https://www.mobygames.com/images/covers/l/280542-metal-gear-rising-revengeance-windows-front-cover.jpg"
      }
    }
  }

  public static createMockError(errorMessage: string) {
    return {
      statusCode: 400,
      body: {
        error: "Bad Request",
        message: errorMessage,
        statusCode: 400
      }
    }
  }
}