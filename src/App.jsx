import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  CheckCircle2,
  ListTodo,
  Settings,
  Plus,
  Search,
  Bell,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSection, setActiveSection] = useState("Dashboard");

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const today = new Date().toISOString().split("T")[0];

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Completed" && task.completed) ||
      (activeFilter === "Pending" && !task.completed) ||
      (activeFilter === "Upcoming" &&
        !task.completed &&
        task.date &&
        task.date >= today);

    return matchesSearch && matchesFilter;
  });

  // Add or Edit Task
  function handleAddTask(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (editingTaskId !== null) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: title.trim(),
                description: description.trim(),
                date,
                time,
              }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        completed: false,
      };

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);
    }

    resetForm();
  }

  // Reset Form
  function resetForm() {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setEditingTaskId(null);
    setIsModalOpen(false);
  }

  // Edit Task
  function handleEditTask(task) {
    setEditingTaskId(task.id);

    setTitle(task.title);
    setDescription(task.description);
    setDate(task.date);
    setTime(task.time);

    setIsModalOpen(true);
  }

  // Delete Task
  function handleDeleteTask(taskId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskId
      )
    );
  }

  // Toggle Task Completion
  function handleToggleTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#111827] p-6 md:block">

        <h1 className="mb-10 text-2xl font-bold text-indigo-400">
          TaskFlow
        </h1>

        <nav className="space-y-3">

          <button
            onClick={() => {
              setActiveSection("Dashboard");
              setActiveFilter("All");
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
              activeSection === "Dashboard"
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => {
              setActiveSection("All Tasks");
              setActiveFilter("All");
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
              activeSection === "All Tasks"
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <ListTodo size={20} />
            All Tasks
          </button>

          <button
            onClick={() => {
              setActiveSection("Upcoming");
              setActiveFilter("Upcoming");
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
              activeSection === "Upcoming"
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <CalendarDays size={20} />
            Upcoming
          </button>

          <button
            onClick={() => {
              setActiveSection("Completed");
              setActiveFilter("Completed");
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
              activeSection === "Completed"
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <CheckCircle2 size={20} />
            Completed
          </button>

        </nav>

        <div className="absolute bottom-6 left-6 right-6">

          <button
            onClick={() => {
              setActiveSection("Settings");
              alert("Settings section selected!");
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
              activeSection === "Settings"
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-gray-400 hover:bg-white/5"
            }`}
          >
            <Settings size={20} />
            Settings
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64">

        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">

          <div>
            <h2 className="text-2xl font-bold">
              My Dashboard
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage your tasks and stay productive.
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* Notifications */}
            <div className="relative">

              <button
                onClick={() =>
                  setIsNotificationOpen(!isNotificationOpen)
                }
                className="relative rounded-xl border border-white/10 p-3 text-gray-400 hover:bg-white/5"
              >
                <Bell size={20} />

                {pendingTasks > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {pendingTasks}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-14 z-50 w-72 rounded-xl border border-white/10 bg-[#111827] p-4 shadow-xl">

                  <h3 className="mb-3 font-bold">
                    Notifications
                  </h3>

                  {tasks.filter((task) => !task.completed).length === 0 ? (
                    <p className="text-sm text-gray-400">
                      You're all caught up!
                    </p>
                  ) : (
                    tasks
                      .filter((task) => !task.completed)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="border-b border-white/10 py-3"
                        >
                          <p className="text-sm font-medium">
                            {task.title}
                          </p>

                          <p className="mt-1 text-xs text-amber-400">
                            Pending Task
                          </p>
                        </div>
                      ))
                  )}

                  <button
                    onClick={() =>
                      setIsNotificationOpen(false)
                    }
                    className="mt-3 w-full rounded-lg bg-indigo-500 px-3 py-2 text-sm hover:bg-indigo-600"
                  >
                    Close
                  </button>

                </div>
              )}

            </div>

            {/* Profile */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
              A
            </div>

          </div>
        </header>

        {/* Dashboard */}
        <section className="p-6 md:p-10">

          {/* Welcome */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

            <div>
              <h3 className="text-3xl font-bold">
                Welcome back!
              </h3>

              <p className="mt-2 text-gray-400">
                Here's what's happening with your tasks today.
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold transition hover:bg-indigo-600"
            >
              <Plus size={20} />
              Add New Task
            </button>

          </div>

          {/* Statistics */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <p className="text-sm text-gray-400">
                Total Tasks
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {totalTasks}
              </h3>

              <p className="mt-2 text-sm text-indigo-400">
                Tasks created
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <p className="text-sm text-gray-400">
                Pending Tasks
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {pendingTasks}
              </h3>

              <p className="mt-2 text-sm text-amber-400">
                Need your attention
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <p className="text-sm text-gray-400">
                Completed Tasks
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                {completedTasks}
              </h3>

              <p className="mt-2 text-sm text-green-400">
                Great progress!
              </p>
            </div>

          </div>

          {/* Task List */}
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

            {/* Task Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

              <h3 className="text-xl font-bold">
                My Tasks
              </h3>

              {/* Search */}
              <div className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">

                <Search
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-36 bg-transparent text-sm outline-none placeholder:text-gray-500"
                />

              </div>

            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-3">

              {["All", "Pending", "Completed", "Upcoming"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      activeFilter === filter
                        ? "bg-indigo-500 text-white"
                        : "border border-white/10 text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}

            </div>

            {/* Empty State OR Task Cards */}
            {filteredTasks.length === 0 ? (

              <div className="flex flex-col items-center justify-center py-16 text-center">

                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10">
                  <ListTodo
                    size={40}
                    className="text-indigo-400"
                  />
                </div>

                <h3 className="text-xl font-bold">
                  {searchQuery
                    ? "No tasks found"
                    : activeFilter === "Completed"
                    ? "No completed tasks yet"
                    : activeFilter === "Upcoming"
                    ? "No upcoming tasks"
                    : activeFilter === "Pending"
                    ? "No pending tasks"
                    : "Your task list is empty"}
                </h3>

                <p className="mt-2 max-w-sm text-sm text-gray-400">
                  {searchQuery
                    ? "Try searching with a different keyword."
                    : "Stay organized and productive. Create your first task to get started!"}
                </p>

                {!searchQuery && activeFilter === "All" && (
                  <button
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(true);
                    }}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-semibold transition hover:bg-indigo-600"
                  >
                    <Plus size={20} />
                    Create Your First Task
                  </button>
                )}

              </div>

            ) : (

              /* Task Cards */
              <div className="space-y-4">

                {filteredTasks.map((task) => (

                  <div
                    key={task.id}
                    className={`rounded-xl border border-white/10 bg-[#0b1120] p-5 transition hover:border-indigo-500/30 ${
                      task.completed ? "opacity-70" : ""
                    }`}
                  >

                    <div className="flex items-start gap-4">

                      {/* Checkbox */}
                      <button
                        onClick={() =>
                          handleToggleTask(task.id)
                        }
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                          task.completed
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-500 hover:border-indigo-400"
                        }`}
                      >
                        {task.completed && (
                          <CheckCircle2 size={16} />
                        )}
                      </button>

                      {/* Task Details */}
                      <div className="min-w-0 flex-1">

                        <h4
                          className={`break-words text-lg font-semibold ${
                            task.completed
                              ? "text-gray-500 line-through"
                              : "text-white"
                          }`}
                        >
                          {task.title}
                        </h4>

                        {task.description && (
                          <p className="mt-2 break-words text-sm text-gray-400">
                            {task.description}
                          </p>
                        )}

                        {/* Date and Time */}
                        <div className="mt-3 flex flex-wrap items-center gap-4">

                          {task.date && (
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <CalendarDays size={14} />
                              {task.date}
                            </div>
                          )}

                          {task.time && (
                            <div className="text-xs text-gray-400">
                              {task.time}
                            </div>
                          )}

                        </div>

                        {/* Status */}
                        <div className="mt-3">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              task.completed
                                ? "bg-green-500/10 text-green-400"
                                : "bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {task.completed
                              ? "Completed"
                              : "Pending"}
                          </span>

                        </div>

                      </div>

                      {/* Edit and Delete */}
                      <div className="flex shrink-0 items-center gap-2">

                        <button
                          onClick={() =>
                            handleEditTask(task)
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-indigo-500/10 hover:text-indigo-400"
                          title="Edit Task"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteTask(task.id)
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete Task"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

      </main>

      {/* Add Task Modal */}
      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                {editingTaskId !== null
                  ? "Edit Task"
                  : "Create New Task"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleAddTask}
              className="space-y-5"
            >

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Task Title *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter task title"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Due Date
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Due Time
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-white/10 px-5 py-3 text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold hover:bg-indigo-600"
                >
                  {editingTaskId !== null
                    ? "Save Changes"
                    : "Add Task"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;