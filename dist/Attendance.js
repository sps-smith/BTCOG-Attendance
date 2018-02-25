var store = new Vuex.Store({
    state:{
      _years: [2014,2015,2016,2017, 2018, 2019, 2020],
      _months: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      _selectedPeriod: "",
      _selectedMonth:0,
      _newreport:false,
      _savedreport:false,
      _dataloded: false,
      _savedData:null
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
        },
        getSavedReport: function(state){
            return state._savedreport;
        },
        getSavedReportData: function(state){
            return state._savedData;
        },
        getDataLoaded: function(state){
            return state._dataloded;
        }
    },
    mutations:{
        setNewReport: function(state, payload){
            state._newreport = payload;
        },
        setSavedReport: function(state, payload){
            state._savedreport = payload;
        },
        setPeriod: function(state, payload){
            state._selectedPeriod = payload;
        },
        setSavedData: function(state, payload){
            state._savedData = payload;
        },
        setDataLoaded: function(state, payload){
            state._dataloded = payload;
        }
    },
    actions:{
        getSavedData: function(context, payload){
            var _data = {
                ssattendance:payload.AverageSS,
                ssoffering:payload.SSOffering,
                ypeattendance:payload.AverageYPE,
                ypeoffering:payload.YPEOffering,

                regattendance:payload.AverageRegularService,
                offering:payload.MonthOffering,
                messages:payload.Preached,
                tithes:payload.MonthTithes,

                bibleclass:payload.BibleClass,
                fasting:payload.Fasting,
                homevisits:payload.HomeVisits,

                streetservice:payload.StreetServices,
                revivalservice:payload.RevivalServices,
                converts:payload.Converts,
                baptized:payload.Baptized,

                added:payload.NewMembers,
                excommunicated:payload.Excommunicated,
                membership:payload.TotalMembers,
                mens:payload.MenServices,

                womens:payload.WomenServices,
                youth:payload.YouthServices,
                mensoffering:payload.MensOffering,
                womensoffering:payload.WomensOffering,
                youthoffering:payload.YouthOffering,

                specialoffering:payload.SpecialOffering,
                rallyoffering:payload.RallyOffering,
                pastoroffering:payload.PastorExpenses,
                mortgagamount:payload.Mortgage,
                rentamount:payload.Rent,
                utilitiesamount:payload.Utilities,

                donationamout:payload.Donations,
                miscamount:payload.MiscExpenses,
                hqamount:payload.HQAmount,
                comments:payload.Comments
            }
            context.commit("setSavedData", _data);
            context.commit("setDataLoaded", true);
        }
    }
})