import { defineStore } from "pinia";
import { groupBy } from "lodash";
export const useCartStore = defineStore("cartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(name){
      this.items = this.items.filter(item=>item.name !== name);
    },
    setItemCount(item, count) {
      count = parseInt(count);  
      const itemIndex = this.items.findIndex(i => i.name === item.name); 
    
      if (itemIndex === -1) return; 
    
      if (count === 0) {
        this.items.splice(itemIndex, 1);
      } else {
        const updatedItem = { ...this.items[itemIndex], count }; 
        this.items.splice(itemIndex, 1, updatedItem); 
      }
    }
    
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: state => groupBy(state.items,item=>item.name),
    groupedCount:(state)=>(name)=>state.grouped[name].length,
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
  },
}
);
