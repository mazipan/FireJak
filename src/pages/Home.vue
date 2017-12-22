<template>
  <div class="grid__row">

    <div class="search">
      <input class="search__text" type="text" 
        name="Search" 
        v-model="searchText" 
        placeholder="Cari Pos Pemadam Kebakaran">
    </div>

    <div>
      <span class="highlight">{{filteredList.length}}</span> Pos Pemadam ditemukan      
    </div>
    <ul class="pemadam">
      <li v-for="pos in filteredList" class="pos">
        <div class="left">
          <img class="icon" 
               v-lazy="'/FireJak/images/Red_Fire_Engine-256x256.png'">        
        </div>
        <div class="right">
          <div class="title" 
               v-html="highlightText(pos.POS_PEMADAM, searchText)">
          </div>
          <div class="alamat"
               v-html="highlightText(pos.ALAMAT, searchText)">
          </div>
          <div class="kel"
               v-html="highlightText(pos.KELURAHAN, searchText)">
          </div>  
          <div class="see-map__wrapper">
             <a 
              :href="'https://www.google.com/maps/search/?api=1&query=' + 
              pos.LAT + ',' + pos.LNG" 
              :alt="pos.POS_PEMADAM" 
              :title="pos.POS_PEMADAM" 
              target="_blank" 
              class="see-map">
              <i class="fa fa-map-marker"></i> 
              Lihat Lokasi
             </a>         
          </div>         
        </div>
 
      </li>
    </ul>

    
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
  },
  data () {
    return {
      searchText: '',
      showingPos: []
    }
  },
  computed: {
    posPemadam () {
      return this.$store.getters.posPemadam
    },
    filteredList() {
      let self = this
      return self.posPemadam.filter(post => {
        
        let samePosPemadam = post.POS_PEMADAM.toLowerCase()
          .includes(self.searchText.toLowerCase())
        
        let sameAlamat = post.ALAMAT.toLowerCase()
          .includes(self.searchText.toLowerCase())
        
        let sameKelurahan = post.KELURAHAN.toLowerCase()
          .includes(self.searchText.toLowerCase())

        return samePosPemadam || sameAlamat || sameKelurahan
      })
    }
  },
  methods: {
    highlightText: function (words, query) {
      function pregQuote (str) {
        return (str.trim() + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1")
      }
      var iQuery = new RegExp(pregQuote(query), 'ig')
      return words.toString().replace(iQuery, function (matchedTxt, a, b) {
        return ('<span class=\'highlight\'>' + matchedTxt + '</span>')
      })
    }
  },
  mounted () {
    this.$store.dispatch('getPosPemadam')
  }
}

</script>

<style lang="scss" scoped>
.pemadam{
  padding: 0;
  margin: 0;
  list-style: none;
}
.pos{
  padding: 1em 0;
  display: table;
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(32, 33, 39, 0.12);
  margin: .5em 0;
}
.left{
  display: table-cell;
  vertical-align: middle;
  width: 120px;
  text-align: center;

  .icon{
    width: 50px;
    margin-right: 10px;
  }
}
.right{
  display: table-cell;
}
.title{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.alamat, .kel{
  font-size: 14px;
  color: #999;
}
.search{
  margin: 10px 0 20px;
  display: flex;

  &__text{
    width: 100%;
    padding: 12px 20px;
    outline: none;
    border: 1px solid #ffb347;
    border-radius: .5em;
  }
}

.see-map{
  line-height: 2;
  font-size: 14px;
  color: #0096D9;
  background-color: #eee;
  padding: .5em;
  text-decoration: none;
  border-radius: .25em;

  &__wrapper{
    margin-top: .5em;
  }
}
</style>
<style>  
.highlight {
  color: #0096D9;
}
</style>
