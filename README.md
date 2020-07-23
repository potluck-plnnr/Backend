# Back-end
Potluck Planner
# Documentation:
# Base URL for Deployed API
https://backend-bw.herokuapp.com/
# Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| POST | /register | register as a new user |
| POST | /login | login as an existing user |
| POST | /potluck | add a new potluck to the database |
| PUT | /potluck | update existing potluck in the database |
| DELETE | /potluck | deletes existing potluck in the database |
| GET | /users | get a list of all users (must be logged in) |
| GET | /potlucks | get a list of all potlucks |
| GET | /potluck/:id | get a list of potlucks user (id) belongs too |
# Table Requirements
# users
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | users id (auto generated) |
| username | string | yes | yes | users username (max 50 char) |
| password | string | yes | no | users password (max 50 char) |
# potluck
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | users id (auto generated) |
| name | string | yes | yes | users username (max 50 char) |
| date | date | yes | no | date of potlock |
| time | time | yes | no | time of potluck |
| items | string | yes | no | items to bring to potluck |
# user_data
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | users id (auto generated) |
| potluck_id | integer | yes | no | id that matches potluck (foreign key) |
| user_id | integer | yes | no | id that matches user (foreign key) |
| role | string | yes | no | organizer or guest (admin will access all) |
| guest_items | string | yes | no | items guest will bring to potluck |