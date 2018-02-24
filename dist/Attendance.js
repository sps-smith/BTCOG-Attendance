var store = new Vuex.Store({
    state:{
      _years: [2014,2015,2016,2017, 2018, 2019, 2020],
      _months: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      _selectedPeriod: "",
      _selectedMonth:0,
      _newreport:false,
      _revenue:[],
      _weeks:5,
      _days:0
    },
    getters:{
        getMonths: function(state){
            return state._months;
        },
        getYears: function(state){
            return state._years;
        },
        getPeriod: function(state){
            return state._selectedPeriod;
        },
        getNewReport: function(state){
            return state._newreport;
        }
    },
    mutations:{
        setNewReport: function(state, payload){
            state._newreport = payload;
        },
        setPeriod: function(state, payload){
            state._selectedPeriod = payload;
        },
    }
})