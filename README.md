<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
 
## Description

As part of the school council, we are seeking to develop a REST API to manage and store student data in a database. This includes names, student numbers, and their corresponding grades by course code. When multiple entries exist for a single course, the API should calculate and store the average grade for that course. 


## Project File Structure

```
└── src
    ├── app.module.ts
    ├── main.ts
    ├── data-sources.ts
    ├── modules
    │   ├── students
    │   │   ├── students.module.ts
    │   │   ├── students.controller.ts
    │   │   ├── students.service.ts
    ├       ├── students.repository.ts
    ├       ├── grade.entity.ts
    ├       ├── student.entity.ts
    │   │   ├── dto
    │   │   │   └── student.dto.ts
    │   │   └── response-dto
    │   │       └── student.res.dto.ts
    │   ├── users
    │   │   ├── users.module.ts
    │   │   ├── users.controller.ts
    │   │   └── users.service.ts
    │   └── ...
    ├── shared
    │   ├── shared.module.ts
    │   └── ...
    └── config
        └── typeorm.config.ts
        interceptors
        └──  serialize.interceptor.ts
```

### Endpoints -

1. **Students Endpoint:**
  - **Endpoint:**   `/api/v1/students`
  - **Method:**     `POST`
  - **Request Body:** 
    ```json
    {
      "name": "John Doe",
      "surname": "Yilmaz", 
      "stdNumber": "123456",
      "grades": [
        {
         "code": "MT101", 
         "value": 90 
        },
        {
          "code": "CSC102",
          "value": 80
        }
      ]
    }
    ```

## Database Schema on Authentication

  | Entity        | Fields                                                      | Relationships                                      |
  |---------------|-------------------------------------------------------------|----------------------------------------------------|
  | StudentEntity    | id, name, surname, stdNumber,  |  One-to-Many with GradeEntity  | 
  | GradeEntity   | id, code, value,   | ManyToOne with StudentEntity | 
 

 ## Features with TypeORM

- **Custom Repositories:** Custom repositories were utilized for database operations.

- **Transactions:** Transactions were used to manage operations atomically.

- **Entity Listeners and Subscribers:** Entity listeners and subscribers were employed to define custom behaviors that will automatically execute during database operations.


## Response Models Using DTOs

- **DTOs for Response:** Data Transfer Objects (DTOs) were employed for defining response models.

  - Objects specified in DTOs: The objects defined in DTOs were returned as responses, providing a structured and tailored data format to clients.

   
- ### Ways to run the application
    #1:) for local development without docker

    - ### Package installation
        - When we run our project with Docker in the production environment or locally, global packages will be installed automatically. Entering these commands is sufficient only for our team members who will run it for the first time locally without docker.
            - ``git clone or git pull``
            - ``npm i``
            - please check the `.env.development` file for the environment variables. if it not exist please create it.
            - ``npm run start:dev``

        - requiremet env value for local development
           - DB_NAME=`dev.sqlite`
           - SYNCHRONIZE=`true`
           - DB_TYPE=`sqlite`
           - LOGGING=`true`
             
       
    #2:) for local development with docker
    
    - ### Requirements
        - Docker and Docker Compose must be installed on your local machine.
        - After cloning the project, you can run the following command to start the project.
        
    - ``docker-compose up``
    
    ``



### Commonly used commands in docker-compose-dev:
- `docker-compose up --build` - Build the containers and start them.
- `docker-compose up` - Start the containers.
- `docker-compose down` - Stop the containers.
- `docker-compose logs` - View output from containers.
- `docker-compose exec <service> sh` - Access the shell of a running container.
 


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## Contact

Nurettin Şen - [ ](gmail.com) - nurie487@gmail.com
 

 