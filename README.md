# WeThePeople

## Project Outline

WeThePeople is a full-stack crowdfunding web application, similar to Kickstarter, and built using the MERN stack. Users will have the ability to create and manage crowdfunding campaigns, while potential backers can browse, search, and contribute to projects of their choice.

Key components of the front-end include:
- A **Navbar** for global navigation
- A **Home page** featuring highlighted projects
- A **Browse page** for searching and filtering projects
- A **ProjectDetails page** to display detailed information and backer tiers
- A **CreateProject page** for project submission
- A **UserProfile page** for user account management.

State management is handled using **Redux**

The API will consist of routes to handle:
- **User authentication** (sign up, log in, log out, password reset)
- **User profile** CRUD operations
- **Project** CRUD operations (including project updates)

=
## Feature Set

The web-based application will provide the following features (feel free to extend this to make the project more vibrant):

### User Authentication
- Handles user registration, login, logout, and password reset functionality.

### Project Creation
- Allows users to create, edit, and delete their own crowdfunding projects.

### Project Browsing
- Enables users to search, filter, and browse through active projects on the platform.

### Project Details
- Displays detailed information about a project, including description, funding goal, duration, updates, and backer tiers.

### Contribution Management
- Allows backers to select a reward tier, contribute, and view their past contributions.

### User Profiles
- Enables users to view and manage their personal information, crowdfunding projects, and project contributions.

### Project Updates
- Allows project creators to post updates about their project's progress, which can be viewed by backers.

### Funding Progress
- Tracks and displays the funding progress of a project, including the amount raised and the percentage of the funding goal achieved.

### Featured Projects
- Highlights a selection of top or trending projects on the home page, making them more visible to potential backers.



# WeThePeople API Documentation

## Authentication

### 1. User Registration

**Route:** `POST /api/auth/signup`

**Description:** Signup a new user.


### 2. User Login

**Route:** `POST /api/auth/login`

**Description:** Authenticate and log in a user.


### 3. User Password Reset

**Route:** `POST /api/change-password`

**Description:** Change a user's password


### 4. Get User Profile

**Route:** `GET /api/users/:id`

**Description:** Retrieve user profile information.

### 5. Update User Profile

**Route:** `PUT /api/users/:id`

**Description:** Update user profile information.



### 6. Create Project

**Route:** `POST /api/projects/create`

**Description:** Create a new crowdfunding project.


### 7. Update Project

**Route:** `PUT /api/projects/:id`

**Description:** Update an existing project.


### 8. Delete Project

**Route:** `DELETE /api/projects/:id`

**Description:** Delete a project.


### 9. Contribute to Project

**Route:** `POST /api/projects/:id/contribute`

**Description:** Contribute to a project.


### 10. Get Project Details

**Route:** `GET /api/projects/:id`

**Description:** Retrieve details of a specific project.


### 11. Add Project Update

**Route:** `POST /api/projects/:id/updates`

**Description:** Add an update to a project.


### 12. Get a list of all projects

**Route:** `GET /api/projects/list`

**Description:** Get a list of all projects.

