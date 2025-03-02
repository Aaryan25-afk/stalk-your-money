<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock your money</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <h1>Stock your money 💰</h1>
        
        <div class="input-section">
            <h2>Add New Expense</h2>
            <form id="expenseForm">
                <input type="text" id="expenseName" placeholder="Expense name" required>
                <input type="number" id="expenseAmount" placeholder="Amount" min="0" step="0.01" required>
                <input type="date" id="expenseDate" required>
                <select id="expenseCategory" required>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit">Add Expense</button>
            </form>
        </div>

        <div class="filters">
            <h2>Filters</h2>
            <div class="filter-controls">
                <input type="month" id="monthFilter">
                <select id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Housing">Housing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>
                <button onclick="applyFilters()">Apply Filters</button>
                <button onclick="clearFilters()">Clear Filters</button>
            </div>
        </div>

        <div class="summary">
            <h2>Summary</h2>
            <div class="summary-cards">
                <div class="card">
                    <h3>Total Expenses</h3>
                    <p id="totalExpenses">$0.00</p>
                </div>
                <div class="card">
                    <h3>Highest Expense</h3>
                    <p id="highestExpense">$0.00</p>
                </div>
                <div class="card">
                    <h3>Category Breakdown</h3>
                    <canvas id="categoryChart"></canvas>
                </div>
            </div>
        </div>

        <div class="expense-list">
            <h2>Expenses</h2>
            <table id="expenseTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="expenseBody">
                   
                </tbody>
            </table>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
