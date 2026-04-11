<div id="top" align="center">
<h1>Budget Manager</h1>
<h3>Spring Boot - React</h3>
<img src="/images/wallet.png" alt="wallet" title="wallet" width="200" height="200">
</div>

<h2>Summary</h2>
<p>Budget Manager is a personal finance application for tracking incomes and expenses, monitoring goals, visualizing financial data through charts, and budget planning.</p>
<p>User data is stored in a MySQL database, while Spring Boot handles the server-side logic.</p>
<p>JWT tokens ensure stateless authentication and secure access to protected endpoints.</p>
<p>React provides a dynamic user interface (UI), and Redux manages a centralized state.</p>
<p>SweetAlert2 and React-Toastify handle alerts and notifications, while Chart.js ensures interactive data visualization.</p>
<p>Spring Scheduler automates periodic tasks, such as processing fixed transactions.</p>

<h2>Features</h2>
<ul> 
<li><strong>Accounts</strong>
  <ul>
    <li>Accounts can be created via standard registration with username and password, or using a Google account.</li>
    <li>Passwords can be reset through an email-based password recovery process.</li>
    <li>After registration, a three-step setup form collects the username, salary and salary day, followed by budget and currency information.</li>
  </ul>
</li>

<li><strong>Financial Dashboard</strong>
  <ul>
    <li>Displays 4 cards and 4 charts for analyzing financial data.</li>
    <li>Cards show total incomes, total expenses, current budget, and the ratio of expenses to incomes.</li>
    <li><strong>Expenses by Category chart</strong> shows how spending is distributed across categories.</li>
    <li>
    <strong>Cumulative Expenses chart</strong> tracks daily spending and compares it to a reference line. <br>
    The reference line is determined from the planned budget, current budget, or total fixed incomes if no budget is available.
    </li>
    <li>
    <strong>Goal Progress Overview chart</strong> shows the status of savings goals. <br>
    Each goal displays the saved percentage and the remaining percentage until the target is reached.
    </li>
    <li><strong>Monthly Incomes vs Expenses chart</strong> shows the total of incomes and expenses for each month.</li>
    <li>If a chart has too many entries, an additional entry named "Others" combines the remaining data.</li>
  </ul>
</li>
  
<li><strong>Income & Expense Management</strong>
  <ul>
    <li>Transactions can be added, edited, or deleted.</li>
    <li>An existing category or source must be selected before adding a transaction.</li>
    <li>Data can be sorted by amount, category, or date.</li>
    <li>Recurring and one-time transactions are supported.</li>
  </ul>
</li>

<li><strong>Goals Management</strong>
  <ul>
    <li>Savings and goals can be added, edited, or deleted.</li>
    <li>Each goal contains a list of associated savings.</li>
    <li>Progress is shown using emojis and a progress bar to indicate how much of each goal has been achieved.</li>
    <li>Funds allocated to any goal can be withdrawn at any time.</li>
  </ul>
</li>

<li><strong>Budget Planner</strong>
  <ul>
    <li>Provides a dedicated interface for planning a monthly budget. <br>
    The allocated budget can be shared across categories using adjustable limits, and any remaining funds can optionally be assigned to a goal.
    </li>
    <li>A warning notification is displayed if a category limit is exceeded.</li>
  </ul>
</li>

<li><strong>Notifications & Alerts</strong>
  <ul>
    <li>Provides feedback and guidance for user actions.</li>
    <li>Shows notifications for operations like adding, editing, or deleting entities.</li>
    <li>Displays alerts for critical operations that require user confirmation.</li>
  </ul>
</li>

<li><strong>Settings</strong>
  <ul>
    <li>Allows updating username, budget, and currency.</li>
    <li>Provides options to reset account data or delete it permanently.</li>
  </ul>
</li>
</ul>

<h2>Screenshots</h2>
<img src="/images/dashboard.png" alt="dashboard" title="dashboard">
<img src="/images/expenses1.png" alt="expenses1" title="expenses1">
<img src="/images/expenses2.png" alt="expenses2" title="expenses2">
<img src="/images/incomes1.png" alt="incomes1" title="incomes1">
<img src="/images/incomes2.png" alt="incomes2" title="incomes2">
<img src="/images/savings1.png" alt="savings1" title="savings1">
<img src="/images/savings2.png" alt="savings2" title="savings2">
<img src="/images/planner1.png" alt="planner1" title="planner1">
<img src="/images/planner2.png" alt="planner2" title="planner2">
<img src="/images/settings1.png" alt="settings1" title="settings1">
<img src="/images/login.png" alt="login" title="login">
<img src="/images/register.png" alt="register" title="register">
<img src="/images/user-data-setup1.png" alt="userdatasetup1" title="userdatasetup1">
<img src="/images/user-data-setup2.png" alt="userdatasetup2" title="userdatasetup2">
<img src="/images/user-data-setup3.png" alt="userdatasetup3" title="userdatasetup3">
<img src="/images/forgot-password.png" alt="forgotpassword" title="forgotpassword">
<img src="/images/reset-password.png" alt="resetpassword" title="resetpassword">
<img src="/images/landing.png" alt="landing" title="landing">
<img src="/images/expenses3.png" alt="expenses3" title="expenses3">
<img src="/images/expenses4.png" alt="expenses4" title="expenses4">
<img src="/images/expenses5.png" alt="expenses5" title="expenses5">
<img src="/images/expenses6.png" alt="expenses6" title="expenses6">
<img src="/images/incomes3.png" alt="incomes3" title="incomes3">
<img src="/images/savings3.png" alt="savings3" title="savings3">
<img src="/images/savings4.png" alt="savings4" title="savings4">
<img src="/images/savings5.png" alt="savings5" title="savings5">
<img src="/images/savings6.png" alt="savings6" title="savings6">
<img src="/images/savings7.png" alt="savings7" title="savings7">
<img src="/images/planner3.png" alt="planner3" title="planner3">
<img src="/images/planner4.png" alt="planner4" title="planner4">
<img src="/images/planner5.png" alt="planner5" title="planner5">
<img src="/images/settings2.png" alt="settings2" title="settings2">
<img src="/images/settings3.png" alt="settings3" title="settings3">

<p align="right"><a href="#top">(Back to top)</a></p>
