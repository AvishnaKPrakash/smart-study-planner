# Smart Study Planner

A responsive ReactJS web application that helps students schedule study tasks, set priorities, track completion, and monitor their study progress.

## Features

- Add study tasks
- Edit study tasks
- Delete study tasks
- Mark tasks as completed
- Search study tasks
- Filter tasks by priority
- Filter tasks by completion status
- Set study date and duration
- Add notes to study tasks
- Track total, completed, and pending tasks
- Calculate overall completion percentage
- Track daily study goals
- Track study streak
- View subject-wise progress
- Store tasks using browser LocalStorage
- Responsive user interface

## Pages

### Dashboard
Provides an overview of study activities, completion statistics, daily study goals, study streak, and today's tasks.

### Study Schedule
Displays all study tasks and provides search, filtering, editing, completion, and deletion features.

### Add Study Task
Allows users to create a study task with subject, topic, date, duration, priority, and notes.

### Progress
Displays overall completion, study hours, subject-wise progress, and study summary.

## Technologies Used

- ReactJS
- JavaScript ES6
- HTML5
- CSS3
- React Router
- LocalStorage
- Vite

## Project Structure

```text
src/
├── components/
│   └── StudyTimer.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Schedule.jsx
│   ├── AddTask.jsx
│   └── Progress.jsx
├── App.jsx
├── App.css
└── index.css