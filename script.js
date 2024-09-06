document.addEventListener('DOMContentLoaded', () => {
    const addExpenseButton = document.getElementById('add-expense');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseCategoryInput = document.getElementById('expense-category');
    const expenseList = document.getElementById('expense-list');

    let expenses = [];
    let editingIndex = -1;

    // Function to render the expenses list
    function renderExpenses() {
        expenseList.innerHTML = ''; // Clear existing list
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <div class="details">
                    ${expense.amount} - ${expense.category} - ${expense.description}
                </div>
                <div>
                    <button class="delete-btn" data-index="${index}">Delete Expense</button>
                    <button class="edit-btn" data-index="${index}">Edit Expense</button>
                </div>
            `;
            expenseList.appendChild(expenseItem);
        });
    }

    // Function to add or update an expense
    function addExpense() {
        const amount = parseFloat(expenseAmountInput.value);
        const description = expenseDescriptionInput.value;
        const category = expenseCategoryInput.value;

        if (description && !isNaN(amount) && amount > 0 && category) {
            if (editingIndex === -1) {
                expenses.push({ amount, description, category });
            } else {
                expenses[editingIndex] = { amount, description, category };
                editingIndex = -1;
                addExpenseButton.innerText = 'Add Expense';
            }
            expenseAmountInput.value = '';
            expenseDescriptionInput.value = '';
            expenseCategoryInput.value = '';
            renderExpenses();
        } else {
            alert('Please fill out all fields with valid data.');
        }
    }

    // Function to edit an expense
    function editExpense(index) {
        const expense = expenses[index];
        expenseAmountInput.value = expense.amount;
        expenseDescriptionInput.value = expense.description;
        expenseCategoryInput.value = expense.category;
        editingIndex = index;
        addExpenseButton.innerText = 'Update Expense';
    }

    // Function to delete an expense
    function deleteExpense(index) {
        expenses.splice(index, 1); // Remove the item from the array
        renderExpenses(); // Re-render the list
    }

    // Add Expense button listener
    addExpenseButton.addEventListener('click', addExpense);

    // Event delegation for edit and delete buttons
    expenseList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const index = target.getAttribute('data-index');
            editExpense(index);
        } else if (target.classList.contains('delete-btn')) {
            const index = target.getAttribute('data-index');
            deleteExpense(index);
        }
    });
});
