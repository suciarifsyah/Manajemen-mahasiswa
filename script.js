let dataMahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
let indexEdit = -1;

function tampilkanData() {
    const tabel = document.getElementById("tabelMahasiswa");
    tabel.innerHTML = "";

    dataMahasiswa.forEach((mhs, index) => {
        tabel.innerHTML += `
            <tr>
                <td>${mhs.nim}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.jurusan}</td>
                <td>${mhs.semester}</td>
                <td>
                    <button class="action-btn edit" onclick="editData(${index})">Edit</button>
                    <button class="action-btn delete" onclick="hapusData(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });

    localStorage.setItem("mahasiswa", JSON.stringify(dataMahasiswa));
}

function tambahData() {
    const nim = document.getElementById("nim").value;
    const nama = document.getElementById("nama").value;
    const jurusan = document.getElementById("jurusan").value;
    const semester = document.getElementById("semester").value;

    if (!nim || !nama || !jurusan || !semester) {
        alert("Data tidak boleh kosong!");
        return;
    }

    dataMahasiswa.push({ nim, nama, jurusan, semester });
    resetForm();
    tampilkanData();
}

function editData(index) {
    const mhs = dataMahasiswa[index];
    document.getElementById("nim").value = mhs.nim;
    document.getElementById("nama").value = mhs.nama;
    document.getElementById("jurusan").value = mhs.jurusan;
    document.getElementById("semester").value = mhs.semester;
    indexEdit = index;
}

function updateData() {
    if (indexEdit === -1) {
        alert("Pilih data yang ingin diedit!");
        return;
    }

    dataMahasiswa[indexEdit] = {
        nim: nim.value,
        nama: nama.value,
        jurusan: jurusan.value,
        semester: semester.value
    };

    indexEdit = -1;
    resetForm();
    tampilkanData();
}

function hapusData(index) {
    if (confirm("Yakin ingin menghapus data?")) {
        dataMahasiswa.splice(index, 1);
        tampilkanData();
    }
}

function resetForm() {
    nim.value = "";
    nama.value = "";
    jurusan.value = "";
    semester.value = "";
}

function cariData() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#tabelMahasiswa tr");

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(keyword)
            ? ""
            : "none";
    });
}

tampilkanData();
