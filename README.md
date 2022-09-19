# projeto20-repoprovas

# <p align = "center"> Project RepoProvas </p>

# Description

---

## Technologies 💻 :

- Node.js
- TypeScript
- PostgreSQL
- Prisma
- JWTs

---

# Routes 🚀🚀

## Route: POST `/cadastro`

- **Purpose**: register new users;
- **Request:**: in body, object formata as follows;

```json
{
  "email": "emailtemplate@email.com", //string (email)
  "password": "1234567890", //string (10 char min)
  "passwordConfirmation": "1234567890" //same as password
}
```

- **StatusCodes**:
  - **201**: Success;
  - **409**: Conflict(email already in use);
  - **422**: Unprocessable entity(wrong object format in body).
---
## Route: POST `/login`

- **Purpose**: Registered users login;
- **Request:**: In body, object format:

```json
{
  "email": "emailtemplate@email.com", //string (email)
  "password": "1234567890" //string (10 char min)
}
```

- **Response:**

```json
{
  "token": "jwt_generated_token"
}
```

- **StatusCodes**:
  - **200**: Success;
  - **401**: Unauthorized(wrong email or password);
  - **422**: Unprocessable entity(wrong body format).
---
## Route: POST `/testes`

- **Purpose :** Uploads new tests ;
- **Headers :** `{ "Authorization": "Bearer $token" }`
- **Request :**

```json
{
  "name": " Calculus for beginners", //string
  "pdfUrl": "https://math.mit.edu/~djk/calculus_beginners/", //string (url)
  "categoryId": 1, //integer (already registered categoriesId: 1,2,3)
  "disciplineId": 2, //integer (already registered disciplineId: 1, 2, 3, 4, 5, 6)
  "teacherId": 1 //integer (already registered teacherId: 1, 2)
}
```

- **Response :** Created object data

```json
{
   "id":  , //int
  "name": ,  //str
  "pdfUrl": ,  //str, url to pdf
  "categoryId": ,  //int, id of course category
  "disciplineId": , //int, course discipline id
  "teacherId": //int, course teacher id
}
```

- **StatusCodes**:
  - 201: Success;
  - 401: Unauthorized(invalid token);
  - 404: Not Found( categoryId | disciplineId | teacherId);
  - 409: Conflict(Teacher not related to discipline);
  - 422: Unprocessable entity(wrong object format).
---
## Route: GET `/testes/disciplinas`

- **Purpose**: Get tests grouped by disciplines;
- **Headers:** `{ "Authorization": "Bearer token" }`
- **Response:**

```json
[
  {
    "id": 1,
    "number": 1,
    "discipline": [
      {
        "id": 1,
        "name": "HTML e CSS",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "tests": []
          }
        ]
      },
      {
        "id": 4,
        "name": "Humildade",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "tests": [
              {
                "id": 1,
                "name": "calculo prova 1 ",
                "pdfUrl": "http://google.com.br",
                "category": {
                  "id": 1,
                  "name": "Projeto"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "number": 2,
    "discipline": [
      {
        "id": 2,
        "name": "JavaScript",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "tests": []
          }
        ]
      },
      {
        "id": 5,
        "name": "Planejamento",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "tests": []
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "number": 3,
    "discipline": [
      {
        "id": 3,
        "name": "React",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Diego Pinho"
            },
            "tests": []
          }
        ]
      },
      {
        "id": 6,
        "name": "Autoconfiança",
        "teacherDiscipline": [
          {
            "teacher": {
              "name": "Bruna Hamori"
            },
            "tests": []
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "number": 4,
    "discipline": []
  },
  {
    "id": 5,
    "number": 5,
    "discipline": []
  },
  {
    "id": 6,
    "number": 6,
    "discipline": []
  }
]
```

- **StatusCodes**:
  - **200**: Success;
  - **401**: Invalid token;
  - **404**: Not found.
---
## Rota: GET `/testes/instrutores`

- **Purpose**: Get tests grouped by teachers;
- **Headers:** `{ "Authorization": "Bearer token" }`
- **Response:**

```json
[
  {
    "id": 1,
    "name": "Diego Pinho",
    "teacherDiscipline": [
      {
        "id": 1,
        "teacherId": 1,
        "disciplineId": 1,
        "tests": []
      },
      {
        "id": 2,
        "teacherId": 1,
        "disciplineId": 2,
        "tests": []
      },
      {
        "id": 3,
        "teacherId": 1,
        "disciplineId": 3,
        "tests": []
      }
    ]
  },
  {
    "id": 2,
    "name": "Bruna Hamori",
    "teacherDiscipline": [
      {
        "id": 4,
        "teacherId": 2,
        "disciplineId": 4,
        "tests": [
          {
            "id": 1,
            "name": "calculo prova 1 ",
            "pdfUrl": "http://google.com.br",
            "category": {
              "id": 1,
              "name": "Projeto"
            }
          }
        ]
      },
      {
        "id": 5,
        "teacherId": 2,
        "disciplineId": 5,
        "tests": []
      },
      {
        "id": 6,
        "teacherId": 2,
        "disciplineId": 6,
        "tests": []
      }
    ]
  }
]
```

- **StatusCodes**:
  - **200 :** Success;
  - **401 :** Invalid token;
  - **404 :** Not Found.

---
