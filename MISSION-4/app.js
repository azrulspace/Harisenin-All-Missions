// Array tunggal untuk menyimpan objek task
let tasks = [];

// DOM Elements
const liveDateEl = document.getElementById('live-date');
const liveTimeEl = document.getElementById('live-time');
const taskForm = document.getElementById('task-form');
const taskDescInput = document.getElementById('task-desc');
const taskPriorityInput = document.getElementById('task-priority');
const taskDueDateInput = document.getElementById('task-due-date');

const pendingList = document.getElementById('pending-list');
const doneList = document.getElementById('done-list');
const pendingCountEl = document.getElementById('pending-count');
const doneCountEl = document.getElementById('done-count');
const btnDeleteAll = document.getElementById('btn-delete-all');

// Fix: Memastikan popup date picker muncul saat seluruh area input diklik
taskDueDateInput.addEventListener('click', function() {
    if (this.showPicker) {
        this.showPicker();
    }
});

// 1. Live Time & Date Update
function updateDateTime() {
    const now = new Date();
    
    // Format Date: Hari, DD Bulan YYYY (e.g. Senin, 02 Agustus 2026)
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    liveDateEl.textContent = now.toLocaleDateString('id-ID', optionsDate);
    
    // Format Time: HH:MM:SS
    liveTimeEl.textContent = now.toLocaleTimeString('id-ID', { hour12: false });
}
// Panggil pertama kali dan set interval tiap detik
updateDateTime();
setInterval(updateDateTime, 1000);

// 2. Load Tasks dari Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem('todo_tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

// 3. Save Tasks ke Local Storage
function saveTasks() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// 4. Mengecek Status Overdue (Terlambat)
function isOverdue(dueDateString) {
    if (!dueDateString) return false;
    
    // Hapus bagian jam dari waktu saat ini agar komparasi hanya berbasis tanggal
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Konversi string YYYY-MM-DD ke objek date
    const dueDate = new Date(dueDateString);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
}

// 5. Render/Tampilkan Tugas ke DOM
function renderTasks() {
    // Kosongkan container terlebih dahulu
    pendingList.innerHTML = '';
    doneList.innerHTML = '';
    
    let pendingCount = 0;
    let doneCount = 0;
    
    tasks.forEach(task => {
        // Buat elemen `li` untuk item tugas
        const li = document.createElement('li');
        li.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
        
        // Tentukan format tanggal pembuatan
        const createDateObj = new Date(task.createdAt);
        const createDateStr = createDateObj.toLocaleDateString('id-ID');
        
        // Cek Overdue (Hanya berlaku untuk tugas yang belum selesai)
        const overdue = !task.isCompleted && isOverdue(task.dueDate);
        const overdueBadge = overdue ? `<span class="badge badge-overdue">Late</span>` : '';
        
        // Due Date info
        const dueDateInfo = task.dueDate ? ` - Jatuh Tempo: ${new Date(task.dueDate).toLocaleDateString('id-ID')}` : '';

        // Struktur HTML tiap item tugas
        li.innerHTML = `
            <div class="task-checkbox-container">
                <input type="checkbox" class="task-checkbox" onchange="toggleTask(${task.id})" ${task.isCompleted ? 'checked' : ''}>
            </div>
            <div class="task-content">
                <p class="task-desc">${task.desc}</p>
                <div class="task-meta">
                    <span class="badge badge-${task.priority.toLowerCase()}">${task.priority}</span>
                    ${overdueBadge}
                    <span class="task-date">Dibuat: ${createDateStr}${dueDateInfo}</span>
                </div>
            </div>
            <button class="btn-delete-task" onclick="deleteTask(${task.id})">Hapus</button>
        `;
        
        // Masukkan ke list yang sesuai
        if (task.isCompleted) {
            doneList.appendChild(li);
            doneCount++;
        } else {
            pendingList.appendChild(li);
            pendingCount++;
        }
    });
    
    // Update jumlah lencana (badges)
    pendingCountEl.textContent = pendingCount;
    doneCountEl.textContent = doneCount;
}

// 6. Handle Form Submit (Menambah Tugas)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    
    const desc = taskDescInput.value.trim();
    const priority = taskPriorityInput.value;
    const dueDate = taskDueDateInput.value;
    
    if (desc === '') return;
    
    const newTask = {
        id: Date.now(), // Menggunakan timestamp sebagai ID unik
        desc: desc,
        priority: priority,
        dueDate: dueDate,
        createdAt: new Date().toISOString(),
        isCompleted: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    // Reset form setelah submit
    taskForm.reset();
    // Kembalikan prioritas ke default
    taskPriorityInput.value = 'Medium';
});

// 7. Toggle Status Tugas (Selesai / Belum Selesai)
// Fungsi ini dipanggil dari event onchange pada checkbox di HTML yang digenerate
window.toggleTask = function(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        saveTasks();
        renderTasks();
    }
};

// 8. Hapus Satu Tugas
// Fungsi ini dipanggil dari event onclick pada button Hapus di HTML
window.deleteTask = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
};

// 9. Hapus Semua Tugas
btnDeleteAll.addEventListener('click', function() {
    if (tasks.length === 0) {
        alert('Tidak ada tugas untuk dihapus.');
        return;
    }
    
    if (confirm('PERINGATAN: Apakah Anda yakin ingin menghapus SEMUA tugas (To-Do & Done)? Aksi ini tidak dapat dibatalkan.')) {
        tasks = []; // Kosongkan array
        saveTasks();
        renderTasks();
    }
});

// 10. Inisialisasi Aplikasi
// Panggil loadTasks saat script pertama kali dijalankan
loadTasks();
