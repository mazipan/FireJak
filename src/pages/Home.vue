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
               v-lazy="'/FireJak/static/images/Red_Fire_Engine-256x256.png'">        
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
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters(['posPemadam']),
    filteredList() {
      let self = this
      return self.posPemadam.filter(post => {
        let isShowing = post.POS_PEMADAM.toLowerCase().includes(self.searchText.toLowerCase()) || post.ALAMAT.toLowerCase().includes(self.searchText.toLowerCase()) || post.KELURAHAN.toLowerCase().includes(self.searchText.toLowerCase())

        return isShowing
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
  padding: 10px;
  display: table;
}
.left{
  display: table-cell;
  vertical-align: middle;

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
</style>
<style>  
.highlight {
  color: #0096D9;
}
</style>
