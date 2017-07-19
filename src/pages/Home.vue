<template>
  <div class="grid__row">

    <h1>-- UNDER DEVELOPMENT --</h1>
    <h5>See Source Code : 
      <a href="https://github.com/mazipan/FireJak" target="_blank">
        https://github.com/mazipan/FireJak
      </a>
    </h5>
    
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
    }
  },
  computed: {
    ...mapGetters(['posPemadam'])    
  },
  methods: {
  },
  mounted () {
    
  }
}

</script>

<style lang="scss" scoped>
.empty-state{
  text-align: center;
  font-size: 24px;
  margin-top: 100px;
  color: #ccc;

  .icon{
    font-size: 48px;
  }
}

.chuck{
  text-align: center;
  margin-top: 100px;
  padding: 0 15px;

  &__img{
    height: 70px;
  }
  &__jokes{
    font-style: italic;
    font-size: 36px;
  }
}

.btn__jokes{
  margin: 20px;
  display: inline-block;
  padding: 13px 20px;
  outline: none;
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: #f05724;
  color: #fff;
  border-radius: .5em;

  -webkit-appearance : none;
  -moz-appearance : none;
  appearance : none;

  &--wrapper{text-align: center;}
}
</style>
