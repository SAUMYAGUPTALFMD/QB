const inpFile = document.getElementById('inpFile');
const previewImage = document.querySelector('#hidden-input');
	
inpFile.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            console.log(this);
            $(previewImage).val(this.result)
        });
        reader.readAsDataURL(file);
    };
});

// function search() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("exampleInputEmail3");
//     filter = input.value.toUpperCase();
//     li = document.getElementsByClassName('li');
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("strong")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// } 