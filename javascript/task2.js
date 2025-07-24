document.addEventListener('DOMContentLoaded', () => {
  const balances = {
    savings: 20000.50,
    current: 24583.00,
    credit: 16792.10
  };

  const welcomeMessage = document.getElementById('welcome-message');
  const transferForm = document.getElementById('transfer-form');
  const contentArea = document.querySelector('.content-area');

  /** ==========  Set Welcome Message  ========== */
  function setWelcomeMessage() {
    const customerID = localStorage.getItem('customerID') || 'Shyam';
    welcomeMessage.textContent = `Greetings ${customerID}!`;
  }

  /** ========== Format Amount to Rs Format  ========== */
  function formatRupees(amount) {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).replace("₹", "Rs.");
  }

  /** ==========  Update Balances in UI  ========== */
  function updateBalanceUI() {
    document.querySelectorAll('.account-card').forEach(card => {
      const accountType = card.querySelector('strong').textContent.toLowerCase();
      const amountEl = card.querySelector('.amount');

      if (accountType.includes("savings")) {
        amountEl.textContent = formatRupees(balances.savings);
      } else if (accountType.includes("current")) {
        amountEl.textContent = formatRupees(balances.current);
      } else if (accountType.includes("credit")) {
        amountEl.textContent = formatRupees(balances.credit);
      }
    });
  }

  /** ========== Handle Sidebar Tab Switching  ========== */
  function setupTabs() {
    const tabs = document.querySelectorAll('.sidebar .tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
      });
    });
  }

  /** ========== Setup Expand/Collapse on Cards ========== */
  function setupToggleCards() {
    const headers = document.querySelectorAll('.toggle-header');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.account-card');
        document.querySelectorAll('.account-card').forEach(c => {
          if (c !== card) c.classList.remove('active');
        });
        card.classList.toggle('active');
      });
    });
  }

  /** ==========   Handle Fund Transfer  ========== */
  function handleFundTransfer() {
    if (!transferForm) return;

    transferForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fromAccount = document.getElementById('from-account').value;
      const amount = parseFloat(document.getElementById('amount').value);

      if (!fromAccount || isNaN(amount) || amount <= 0) {
        alert("Please fill in all fields with valid values.");
        return;
      }

      if (balances[fromAccount] < amount) {
        alert("Insufficient balance!");
        return;
      }


      balances[fromAccount] -= amount;
      updateBalanceUI();

      
      const transferMsg = document.getElementById('transfer-message');
      transferMsg.textContent = `Transfer of ${formatRupees(amount)} from your ${fromAccount} account is successful!`;

      
      document.querySelector('.sidebar .tab[data-tab="account-summary"]').click();

     
      transferForm.reset();

      setTimeout(() => {
        transferMsg.textContent = "";
      }, 5000);
    });
  }

  /** ========== Modal Logic for View Statement ========== */
  function setupStatementModal() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('statement-modal');
    const closeBtn = document.querySelector('.close-btn');

    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'block';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  /** ==========  Logout Handling  ========== */
  function setupLogout() {
    const logoutBtn = document.getElementById('logout-button');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('customerID');
      window.location.href = 'index.html';
    });
  }

  /** ==========  Initialization Function  ========== */
  function initApp() {
    setWelcomeMessage();
    updateBalanceUI();
    setupTabs();
    setupToggleCards();
    handleFundTransfer();
    setupStatementModal();
    setupLogout();
  }

  initApp(); 
});