# TaskFlow --- To-Do Web Application

A modern, responsive task management dashboard built with **React**,
**Vite**, **Tailwind CSS**, and **Lucide React**. TaskFlow helps users
organize daily work, track progress, and manage tasks through a clean
dark-themed interface.

## ✨ Features

-   **Create tasks** with a title, description, due date, and due time
-   **Edit tasks** whenever details change
-   **Delete tasks** with a confirmation prompt
-   **Mark tasks as completed** or pending
-   **Task statistics** for total, pending, and completed tasks
-   **Search tasks** by title
-   **Filter tasks** by All, Pending, Completed, and Upcoming
-   **Notifications panel** showing pending tasks
-   **Empty state** for first-time users
-   **Responsive dashboard UI** with a dark theme

## 🛠️ Tech Stack

-   React
-   Vite
-   Tailwind CSS
-   Lucide React
-   JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) (which includes npm).

### Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/asmitwad/SCT_WD_4.git
    ```

2.  Move into the project directory:

    ``` bash
    cd SCT_WD_4
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Start the development server:

    ``` bash
    npm run dev
    ```

5.  Open the local URL shown in the terminal (usually
    `http://localhost:5173`).

## 📁 Project Structure

``` text
SCT_WD_4/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📌 Usage

1.  Select **Add New Task** or **Create Your First Task**.
2.  Enter a task title and optionally add a description, due date, and
    due time.
3.  Add the task to your list.
4.  Use the checkbox to mark it completed.
5.  Use the edit or delete controls to update or remove a task.
6.  Search or use the filters to find tasks.

## 💡 Current Data Behavior

Tasks are currently held in React state. They are available while the
app is running, but they are **not yet persisted after a page refresh**.
Persistent storage can be added in a future update.

## 🎓 Internship

This project was developed as **Task 4 --- To-Do Web App** for the
**SkillCraft Technology Web Development Internship**.

## 👨‍💻 Author

**Asmit Wad**

-   GitHub: [@asmitwad](https://github.com/asmitwad)

## 📄 License

This project is available for learning and portfolio purposes. No
license has been added to the repository.
