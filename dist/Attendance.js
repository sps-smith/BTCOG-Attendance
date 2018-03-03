var store = new Vuex.Store({
    state:{
      _years: [2014,2015,2016,2017, 2018, 2019, 2020],
      _months: ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      _selectedPeriod: "",
      _selectedMonth:0,
      _selectedYear:0,
      _newreport:false,
      _savedreport:false,
      _dataloded: false,
      _savedData:null,
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
        },
        getSelectedMonth: function(state){
            return state._selectedMonth;
        },
        getSelectedYear: function(state){
            return state._selectedYear;
        },
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
        },
        setSelectedMonth: function(state,payload){
            state._selectedMonth = payload;
        },
        setSelectedYear: function(state, payload){
            state._selectedYear = payload;
        },
    },
    actions:{
        getSavedData: function(context, payload){
            if (payload != "")
            {
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
                    comments:payload.Comments == null ? "" : payload.Comments.replace(/<\/?[^>]+(>|$)/g, "")
                }
                context.commit("setSavedData", _data);
                context.commit("setDataLoaded", true);
            }
            else
            {
                context.commit("setSavedData", null);
                context.commit("setDataLoaded", true);
            }
        },
        DeleteRecord:function(context){
            axios.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Monthly Reports')/items?$filter=Month eq " + context.state._selectedMonth + " and Year eq " +  context.state._selectedYear,{
                headers: { "accept": "application/json;odata=verbose" }
            })
            .then(function(response){
                var _url = response.data.d.results[0].__metadata.uri;

                var config = {
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "Content-Type": "application/json;odata=verbose",
                        "If-Match": response.data.d.results[0].__metadata.etag
                    }
                }

                axios.delete(_url,config)
                .then(function(response){
                    if (response.status == 200)
                    {
                        alert("Record deleted successfully");
                        context.commit("setNewReport", false);
                        context.commit("setSavedReport", false);
                        context.commit("setDataLoaded", false);
                    }
                    else
                        alert("Error in deleting record. Please retry or contact the developer");
                })
            })
        }
    }
})

function savedata(month, year, ssattendance ,
    ssoffering ,
    ypeattendance ,
    ypeoffering ,
    regattendance ,
    offering ,
    messages ,
    tithes ,
    bibleclass ,
    fasting ,
    homevisits ,
    streetservice ,
    revivalservice ,
    converts ,
    baptized ,
    added ,
    excommunicated ,
    membership ,
    mens ,
    womens ,
    youth ,
    mensoffering ,
    womensoffering ,
    youthoffering ,
    specialoffering ,
    rallyoffering ,
    pastoroffering ,
    mortgagamount ,
    rentamount ,
    utilitiesamount ,
    donationamout ,
    miscamount ,
    hqamount,
    comments,code){
        axios.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Monthly Reports')?$select=ListItemEntityTypeFullName",{
            headers: { "accept": "application/json;odata=verbose" }
        })
        .then(function(response){
            var _entity = response.data.d.ListItemEntityTypeFullName;
            var item = {
                "__metadata": { "type": _entity},
                Month: month,
                Year: year,
                AverageSS : ssattendance,
                SSOffering : ssoffering,
                AverageYPE : ypeattendance,
                YPEOffering : ypeoffering,
                AverageRegularService : regattendance,
                MonthOffering : offering,
                Preached : messages,
                MonthTithes : tithes,
                BibleClass : bibleclass,
                Fasting:fasting,
                HomeVisits : homevisits,
                StreetServices : streetservice,
                RevivalServices : revivalservice,
                Converts : converts,
                Baptized : baptized,
                NewMembers : added,
                Excommunicated : excommunicated,
                TotalMembers : membership,
                MenServices : mens,
                WomenServices : womens,
                YouthServices : youth,
                MensOffering : mensoffering,
                WomensOffering : womensoffering,
                YouthOffering : youthoffering,
                SpecialOffering : specialoffering,
                RallyOffering : rallyoffering,
                PastorExpenses : pastoroffering,
                Mortgage : mortgagamount,
                Rent : rentamount,
                Utilities : utilitiesamount,
                Donations : donationamout,	
                MiscExpenses : miscamount,
                HQAmount : hqamount,
                Comments:comments
            }

            var config = {
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "Content-Type": "application/json;odata=verbose"
                }
            }
            axios.post(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Monthly Reports')/items",JSON.stringify(item),config)
            .then(function(response){
                if (response.status == 201)
                { 
                    alert("Record saved successfully");
                    if (store.getters.getNewReport)
                    {
                        store.commit("setNewReport", false);
                        store.commit("setSavedReport", true);
                    }
                    store.dispatch("getSavedData",response.data.d);
                }
                else
                    alert("Error in saving information. Please retry or contact the developer");
            })
        })
}

function updatedata(month, year, ssattendance ,
    ssoffering ,
    ypeattendance ,
    ypeoffering ,
    regattendance ,
    offering ,
    messages ,
    tithes ,
    bibleclass ,
    fasting ,
    homevisits ,
    streetservice ,
    revivalservice ,
    converts ,
    baptized ,
    added ,
    excommunicated ,
    membership ,
    mens ,
    womens ,
    youth ,
    mensoffering ,
    womensoffering ,
    youthoffering ,
    specialoffering ,
    rallyoffering ,
    pastoroffering ,
    mortgagamount ,
    rentamount ,
    utilitiesamount ,
    donationamout ,
    miscamount ,
    hqamount,
    comments,code){
        var _entity;
        axios.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Monthly Reports')?$select=ListItemEntityTypeFullName",{
            headers: { "accept": "application/json;odata=verbose" }
        })
        .then(function(response){
            _entity = response.data.d.ListItemEntityTypeFullName;

            axios.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Monthly Reports')/items?$filter=Month eq " + month + " and Year eq " +  year,{
                headers: { "accept": "application/json;odata=verbose" }
            })
            .then(function(response){
                
                var _url = response.data.d.results[0].__metadata.uri;
                var item = {
                    "__metadata": { "type": _entity},
                    AverageSS : ssattendance,
                    SSOffering : ssoffering,
                    AverageYPE : ypeattendance,
                    YPEOffering : ypeoffering,
                    AverageRegularService : regattendance,
                    MonthOffering : offering,
                    Preached : messages,
                    MonthTithes : tithes,
                    BibleClass : bibleclass,
                    Fasting:fasting,
                    HomeVisits : homevisits,
                    StreetServices : streetservice,
                    RevivalServices : revivalservice,
                    Converts : converts,
                    Baptized : baptized,
                    NewMembers : added,
                    Excommunicated : excommunicated,
                    TotalMembers : membership,
                    MenServices : mens,
                    WomenServices : womens,
                    YouthServices : youth,
                    MensOffering : mensoffering,
                    WomensOffering : womensoffering,
                    YouthOffering : youthoffering,
                    SpecialOffering : specialoffering,
                    RallyOffering : rallyoffering,
                    PastorExpenses : pastoroffering,
                    Mortgage : mortgagamount,
                    Rent : rentamount,
                    Utilities : utilitiesamount,
                    Donations : donationamout,	
                    MiscExpenses : miscamount,
                    HQAmount : hqamount,
                    Comments:comments
                }

                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
                    method: "POST",
                    headers: { "Accept": "application/json; odata=verbose" },
                    success: function (data) {
                        $('#__REQUESTDIGEST').val(data.d.GetContextWebInformation.FormDigestValue)
                    },
                    error: function (data, errorCode, errorMessage) {
                        alert(errorMessage)
                    }
                }).done(function(){
                    UpdateFormDigest(_spPageContextInfo.webAbsoluteUrl, _spFormDigestRefreshInterval);

                    var config = {
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "X-Http-Method": "MERGE",
                            "Content-Type": "application/json;odata=verbose",
                            "If-Match": response.data.d.results[0].__metadata.etag
                        }
                    }

                    axios.patch(_url,JSON.stringify(item),config)
                    .then(function(response){
                        if (response.status == 204)
                        {
                            alert("Record updated successfully");
                        }
                        else
                            alert("Error in updating record. Please retry or contact the developer");
                    })
            })
        })
    })
}