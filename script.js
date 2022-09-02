//Tangkap element attendance_form dan root
let attendance_form = document.getElementById('attendance_form'); //variable untuk nangkap form
let root = document.getElementById('root'); //variable untuk nangkap root

//Kita buat ARRAY untuk menampung data absensi
let attendance_data = []; //hanya tipe data array kosong, bukan variable

//Tambahkan eventListener ke element attendance_form
attendance_form.addEventListener('submit', (event) => {
  //Mencegah form dari reload page
  event.preventDefault();

  /*console.info(event.target.fullName.value); console event dulu, untuk cek udah tampil atau tidak (submit event adalah object) akses value object dengan titik. Target adalah element for itu sendiri. Kita mau nangkap element input, element input udah berupa object karena sudah kita buat id. kita tangkap id nya. Kita nangkap element input dengan id = fullname.
  Kita ngak butuh elementnya tapi kita butuh value, makanya kita tambahkan.value, (nangkap value) value : isi dari atribut value, yaitu apapun yang diinput user*/

  let fullName = event.target.fullName.value;
  //console.info(fullName);

  //Mini Validator
  if (fullName == '') {
    //bisa juga pakai if (!fullName)
    alert('Silahkan masukkan nama lengkap');
    return; //supaya stop code sampai sini,  ngak jalanin code dibawah jika kondisi ini masuk
  }

  //Push data ke dalam array dengan nama array attendance_data yang kita sudah buat diatas.

  //array method push, menambahkan item ke dalam array, push tipe data apa ([], number, boolean, object {}
  attendance_data.push({
    nama_lengkap: fullName, //property diwakilkan dengan variable fullName (ambil value fullname)
    waktu: new Date().toLocaleTimeString(),
    tanggal: new Date().toLocaleDateString(), //function date untuk mencetak date kalau pada saat dimasukkan jika localdatestring
  });

  //console.info(attendance_data);

  //Reset input field
  event.target.fullName.value = ''; //Supaya ketika disubmit, field akan kosong, ke reset lagi

  //Panggil FUNCTION renderToHTLML

  renderToHtml();
});

//Buat sebuah Function untuk RENDER DATA to Array ke div root
function renderToHtml() {
  //RESET element div root //jadi kalau ada data didalam, direset dulu
  root.innerHTML = '';

  //Mapping array to html element //Jadi kita akan mapping array dari data absensi yang ada divariable attendance data

  attendance_data.forEach((e, i) => {
    //e, i adalah parameter
    root.innerHTML += `
    <div class ="card" draggable="true" ondragend="handleDelete(${i})">
      <span> ${i + 1}. &nbsp; ${e.nama_lengkap} </span>
      <span> ${e.waktu} ${e.tanggal} </span> 
    </div>
    `;
  }); //masing-masing item array
}

//Delete Function
function handleDelete(index) {
  //console.info(index);

  //Delete 1 data dari Array
  attendance_data.splice(index, 1);

  //Render kembali data dalam array ke html
  renderToHtml();
}
