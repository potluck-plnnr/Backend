# Back-end
Potluck Planner
# Documentation:
# Base URL for Deployed API
https://backend-bw.herokuapp.com/
# Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| POST | register | register as a new user |
| POST | login | login as an existing user |
| GET | users | get a list of all users (must be logged in) |
# Table Requirements
# Users
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | users id (auto generated) |
| username | string | yes | yes | users username (max 50 char) |
| password | string | yes | no | users password (max 50 char) |
