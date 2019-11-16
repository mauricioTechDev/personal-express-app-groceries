/* globals fetch */
var update = document.getElementById('update')
var eraseItem = document.getElementsByClassName('erase')
var importantItem =  document.getElementsByClassName('importantItem')

Array.from(importantItem).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
        const price = this.parentNode.childNodes[3].innerText
        const status = parseFloat(this.parentNode.childNodes[5].innerText)
        fetch('items', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'price':" I GOT IT!"
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});



Array.from(eraseItem).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.childNodes[1].innerText
        const price = this.parentNode.childNodes[3].innerText
        console.log(name)
        console.log(price)
        // console.log(price)
        fetch('items', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'price': price
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
