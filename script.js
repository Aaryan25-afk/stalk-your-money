let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let chartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    renderExpenses();
    updateSummary();
    populateCategoryFilter();
    initializeChart();
});

document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const expense = {
        id: Date.now(),
        name: document.getElementById('expenseName').value,
        amount: parseFloat(document.getElementById('expenseAmount').value),
        date: document.getElementById('expenseDate').value,
        category: document.getElementById('expenseCategory').value
    };
    
    expenses.push(expense);
    saveToLocalStorage();
    renderExpenses();
    updateSummary();
    resetForm();
});

function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpenses(filteredExpenses = expenses) {
    const tbody = document.getElementById('expenseBody');
    tbody.innerHTML = '';
    
    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(expense.date).toLocaleDateString()}</td>
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td class="actions">
                <button onclick="editExpense(${expense.id})" class="edit-btn">Edit</button>
                <button onclick="deleteExpense(${expense.id})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveToLocalStorage();
    renderExpenses();
    updateSummary();
}

function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('expenseDate').value = expense.date;
    document.getElementById('expenseCategory').value = expense.category;
    deleteExpense(id);
}

function updateSummary() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const highest = expenses.length ? Math.max(...expenses.map(e => e.amount)) : 0;
    
    document.getElementById('totalExpenses').textContent = `$${total.toFixed(2)}`;
    document.getElementById('highestExpense').textContent = `$${highest.toFixed(2)}`;
    
    updateChart();
}

function initializeChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#4a90e2',
                    '#50e3c2',
                    '#ff7675',
                    '#f9a825',
                    '#6c5ce7',
                    '#00b894'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateChart() {
    const categories = [...new Set(expenses.map(e => e.category))];
    const amounts = categories.map(cat => 
        expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
    );
    
    chartInstance.data.labels = categories;
    chartInstance.data.datasets[0].data = amounts;
    chartInstance.update();
}

function applyFilters() {
    const monthFilter = document.getElementById('monthFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filtered = expenses;
    
    if (monthFilter) {
        filtered = filtered.filter(expense => 
            expense.date.startsWith(monthFilter)
        );
    }
    
    if (categoryFilter) {
        filtered = filtered.filter(expense => 
            expense.category === categoryFilter
        );
    }
    
    renderExpenses(filtered);
}

function clearFilters() {
    document.getElementById('monthFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    renderExpenses();
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other'];
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

function resetForm() {
    document.getElementById('expenseForm').reset();
}
