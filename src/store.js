import axios from 'axios';
import { createPinia } from 'pinia';
import { defineStore } from 'pinia';

const pinia = createPinia();

// Экспорт экземпляра Pinia
export default pinia;

export const useMyStore = defineStore('myStore', {
    state: () => ({
      list: [],
    }),
    actions: {
      async fetchIPData(ipAddresses) {
        try {
            const promises = ipAddresses.map(ip => axios.get(`http://ip-api.com/json/${ip}`));
    
            const responses = await Promise.all(promises);
            /* eslint-disable */
            responses.map(response => {
                console.log('response', response);
                let item;
                if (response.data.status === 'success') {
                  item = {
                    city: response.data.city,
                    country: response.data.country,
                    code: response.data.countryCode,
                    isp: response.data.isp,
                    org: response.data.org,
                    regionName: response.data.regionName,
                    ip: response.data.query,
                    status: response.data.status,
                    zip: response.data.zip,
                    checked: false
                  }
                }
                else {
                  item = {
                    status: response.data.status,
                    message: response.data.message,
                    ip: response.data.query,
                    checked: false
                  }
                }
                this.list.push(item);
            });
        } catch (error) {
            console.error('Error fetching IP data:', error);
            throw error;
        }
    },
    clearList() {
        this.list = [];
    },
    deleteItem(ip) {
      const index = this.list.findIndex( item => item.ip === ip);
      this.list.splice(index, 1);
    }
  }
});