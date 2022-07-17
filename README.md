# Store management API

## how to use

- run `git clone `
- run `npm start `

## API resources

### User API resources

All user API follows `/v1/user/`

| #  | Routers                           | Verbs  | Progress   | Private    | Description                                  |
|---| ---------------------------        | ------ | ---------- | ---------- | -------------------------------------------- |
| 1 | `/v1/user`                         | POST   | DONE       |  NO        | create a user                                |
| 2 | `/v1/user`                         | GET    | DONE       |  YES       | get user info                                |
| 3 | `/v1/user/login`                   | POST   | DONE       |  NO        | verify user auth and return jwt              |
| 4 | `/v1/user/reset-password`          | POST   | DONE       |  NO        | verify email & pin to reset password         |
| 5 | `/v1/user/reset-password`          | PATCH  | DONE       |  NO        | replace with new password and update db      |
| 6 | `/v1/user/logout`                  | DELETE | DONE       |  YES       | delete user access jwt                       |

### Category API resources

All category API follows `/v1/category/`

| #  | Routers                               | Verbs  | Progress   | Private    | Description                                  |
| ---| ---------------------------           | ------ | ---------- | ---------- | -------------------------------------------- |
| 1 | `/v1/category`                   | POST   | TODO       |  NO        | verify category auth and return jwt          |
| 2 | `/v1/category/request-reset-password`  | POST   | TODO       |  NO        | verify email & pin to reset password         |
| 3 | `/v1/category/reset-password`          | POST   | TODO       |  NO        | replace with new password                    |
| 4 | `/v1/category/{id}`                    | POST   | TODO       |  NO        | get user info                                |