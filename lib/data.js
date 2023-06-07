export default function DataDiri() {
    return {
        datadiri: {
            nrp: "502XXXXXX9",
            kontak: "085123456789",
            semester: "4",
        },
        ekonomi: {
            golongan_ukt: "4",
            pekerjaan_ayah: "Milyader",
            pendapatan_ayah: "golongan_5",
            pekerjaan_ibu: "Presiden",
            pendapatan_ibu: "golongan_6",
        },
        akademik: {
            sks_tempuh: 20,
            sks_lulus: 30,
            matkul_mengulang: ['no', 'bing', 'bindo', 'kwn']
        }
    }
}

export function capitalize(dicari) {
    const capital = ['nrp', 'ukt', 'sks']
    return capital.includes(dicari);
}

export function golonganUkt(golongan) {
    switch (golongan.split("_")[1]) {
        case '1':
            return '< 1.000.000';
        case '2':
            return '1.000.000 - 2.500.000';
        case '3':
            return '2.500.000 - 4.000.000';
        case '4':
            return '4.000.000 - 5.000.000';
        case '5':
            return '5.000.000 - 6.000.000';
        case '6':
            return '> 6.000.000';
        default:
            return 'none'
    }
}

export function listMatkul() {
    return {
        no: "Tidak ada",
        klk1: "Kalkulus 1",
        klk2: "Kalkulus 2",
        fsk1: "Fisika 1",
        fsk2: "Fisika 2",
        kimiakpb: "Kimia / Kalkulus Peubah Banyak",
        agama: "Agama",
        pcs: "Pancasila",
        kwn: "Kewarganegaraan",
        bindo: "Bahasa Indonesia",
        bing: "Bahasa Inggris",
        pte: "Pengantar Teknologi Elektro",
        rl: "Rangkaian Listrik",
        dasprog: "Dasar Pemrograman",
        proglan: "Pemrograman Lanjut"
    }
}