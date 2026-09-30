let daftarTugas = [
    { id: 1, nama: "Mendesain UI/UX di Figma", prioritas: "Tinggi", selesai: true },
    { id: 2, nama: "Membuat Struktur HTML Semantik", prioritas: "Sedang", selesai: true },
    { id: 3, nama: "Menyusun CSS Layout Responsif", prioritas: "Tinggi", selesai: false }
];

const formTugas = document.getElementById('form-tugas');
const inputNama = document.getElementById('input-nama-tugas');
const selectPrioritas = document.getElementById('select-prioritas');
const kontainerTugas = document.getElementById('kontainer-tugas');

const btnSemua = document.getElementById('filter-semua');
const btnBelum = document.getElementById('filter-belum');
const btnSelesai = document.getElementById('filter-selesai');

let filterAktif = 'semua';

const renderTugas = () => {
    kontainerTugas.innerHTML = '';

    const tugasTersaring = daftarTugas.filter(tugas => {
        if (filterAktif === 'belum') return !tugas.selesai;
        if (filterAktif === 'selesai') return tugas.selesai;
        return true; 
    });

    if (tugasTersaring.length === 0) {
        kontainerTugas.innerHTML = `<p style="text-align:center; color:#999; padding:20px;">Tidak ada aktivitas yang ditemukan.</p>`;
        return;
    }

    tugasTersaring.forEach(tugas => {
        const artikel = document.createElement('article');
        artikel.className = `kartu-tugas ${tugas.selesai ? 'selesai' : ''}`;

        let warnaBadge = '#ffeaa7'; 
        if (tugas.prioritas === 'Tinggi') warnaBadge = '#ff7675';
        if (tugas.prioritas === 'Rendah') warnaBadge = '#55efc4';

        artikel.innerHTML = `
            <div>
                <h3>${tugas.nama}</h3>
                <p>Prioritas: <span class="badge-prioritas" style="background: ${warnaBadge}">${tugas.prioritas}</span></p>
            </div>
            <div class="aksi-tugas">
                <button class="btn-status" onclick="ubahStatusTugas(${tugas.id})">
                    ${tugas.selesai ? 'Batal' : 'Selesai'}
                </button>
                <button class="btn-hapus" onclick="hapusTugas(${tugas.id})">Hapus</button>
            </div>
        `;

        kontainerTugas.appendChild(artikel);
    });
};

formTugas.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah halaman reload saat submit

    const namaBaru = inputNama.value.trim();
    const prioritasBaru = selectPrioritas.value;

    if (namaBaru === '') return;

    const dataBaru = {
        id: Date.now(), 
        nama: namaBaru,
        prioritas: prioritasBaru,
        selesai: false
    };

    daftarTugas.push(dataBaru);

    inputNama.value = '';
    selectPrioritas.value = 'Tinggi';

    renderTugas();
});

window.ubahStatusTugas = (id) => {
    daftarTugas = daftarTugas.map(tugas => {
        if (tugas.id === id) {
            return { ...tugas, selesai: !tugas.selesai };
        }
        return tugas;
    });
    renderTugas();
};

window.hapusTugas = (id) => {
    
    daftarTugas = daftarTugas.filter(tugas => tugas.id !== id);
    renderTugas();
};

const aturFilterAktif = (tombolAktif, tipeFilter) => {
    
    [btnSemua, btnBelum, btnSelesai].forEach(btn => btn.classList.remove('active'));

    tombolAktif.classList.add('active');
    
    filterAktif = tipeFilter;
    renderTugas();
};

btnSemua.addEventListener('click', () => aturFilterAktif(btnSemua, 'semua'));
btnBelum.addEventListener('click', () => aturFilterAktif(btnBelum, 'belum'));
btnSelesai.addEventListener('click', () => aturFilterAktif(btnSelesai, 'selesai'));

renderTugas();
