<template>
  <div class="ui centered grid">
    <p>
      <i class="icon link angle double left big teal" @click="changePage(0)"/>
      <i class="icon link angle left big teal" @click="changePage(-1)"/>
      <span> Page {{ page }} of {{ pages }} </span>
      <i class="icon link angle right big teal" @click="changePage(1)"/>
      <i class="icon link angle double right big teal" @click="changePage(pages)"/>
    </p>
  </div>
</template>

<script>
export default {
  props: ["totalRecords", "perPageOptions"],
  data() {
    return {
      page: 1,
      perPage: 10
    };
  },
  computed: {
    pages() {      
        const remainder = this.totalRecords % this.perPage;
        if(remainder > 0){
            return Math.floor(this.totalRecords / this.perPage) + 1;
        }else{
            return this.totalRecords / this.perPage
        }
    }
  },
  methods: {
    changePage(val){
        switch(val){
            case 0: this.page = 1; break;
            case -1: this.page = this.page > 1 ? this.page -1 : this.page; break;
            case 1: this.page = this.page < this.pages ? this.page+ 1 : this.page; break;
            case this.pages: this.page = this.pages; break;
        }
        this.$emit('input', {page:this.page, perPage: 10})
    }
  }
};
</script>
