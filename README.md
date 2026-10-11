# Experiment 5: MongoDB Atlas CRUD Operations

## 1. Create Project

```powershell
cd "C:\Users\surut\Desktop\sem 5 syllabus\cloud lab"
mkdir mongo-crud
cd mongo-crud
npm init -y
npm install express mongoose cors dotenv
```

If the folder already exists, use `cd mongo-crud` instead of creating it again.

## 2. Create Files

```powershell
New-Item server.js
New-Item index.html
New-Item .env
```

Add the backend code to `server.js`, frontend code to `index.html`, and MongoDB connection string to `.env`.

`.env` format:

```text
MONGO_URI=your_mongodb_atlas_connection_string
```

## 3. Create `.gitignore`

```powershell
@"
node_modules/
.env
"@ | Out-File -Encoding utf8 .gitignore
```

## 4. Run Backend

```powershell
node server.js
```

Expected output:

```text
Server running on port 5000
MongoDB connected
```

Keep this terminal running.

## 5. Run Frontend

Open a second PowerShell terminal in the `mongo-crud` folder.

```powershell
npx http-server -p 8000
```

If prompted, type `y` to install `http-server`.

Open in your browser:

```text
http://localhost:8000
```

## 6. CREATE — Insert a Task

Run in a second PowerShell terminal:

```powershell
$body = @{
    title = "Cloud Computing"
    summary = "MongoDB Atlas CRUD Experiment"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/tasks -Method Post -Body $body -ContentType "application/json"
```

Copy the `_id` returned by MongoDB.

## 7. READ — Display All Tasks

```powershell
Invoke-RestMethod http://localhost:5000/tasks
```

## 8. UPDATE — Modify a Task

Replace `YOUR_TASK_ID` with the actual `_id` from CREATE.

```powershell
$id = "YOUR_TASK_ID"

$body = @{
    title = "Cloud Computing Lab"
    summary = "Updated MongoDB Atlas task"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/tasks/$id" -Method Put -Body $body -ContentType "application/json"
```

## 9. DELETE — Remove a Task

Replace `YOUR_TASK_ID` with the same task ID.

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/tasks/YOUR_TASK_ID" -Method Delete
```

## 10. Verify Deletion

```powershell
Invoke-RestMethod http://localhost:5000/tasks
```

The deleted task should no longer appear.

## 11. View Database in MongoDB Atlas

1. Open https://cloud.mongodb.com/
2. Open your project and `Cluster0`.
3. Click **Browse Collections**.
4. Open the `mongocrud` database.
5. Open the `tasks` collection.

## 12. Push Updates to GitHub

Repository: https://github.com/suruthisagar2007/mongodb-crud

```powershell
git add .
git commit -m "Update MongoDB CRUD experiment"
git push
```

**Important:** Never upload `.env` or your database password to GitHub.
