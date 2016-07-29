(function() {

  return {
    events: {
      'app.created':'appCreated',
      'ticket.brand.changed':'appCreated'
    },

    appCreated: function() {
      // request Records

      var records = [
        // brand_profile
        {
          "id": "af0e4fa4-5539-11e6-822e-22000b460297",
          "data": {
            "foo": "bar",
            "brand": {
              "id":1546788,
              "key":"gucci",
              "name":"Gucci"
            },
            "customer_since":"2012-09-22T03:08:11.959Z"
          },
          "title": null,
          "category": "brand_profile",
          "created_at": "2016-07-29T03:08:11.959Z",
          "updated_at": "2016-07-29T03:08:11.959Z",
          "ticket_ids": [],
          "user_ids": [
            1
          ],
          "organization_ids": [],
          "record_ids": []
        },
        {
          "id": "af0e4fa4-5539-11e6-822e-22000b460297",
          "data": {
            "foo": "bar",
            "brand": {
              "id":1546728,
              "key":"ysl",
              "name":"Yves Saint Laurent"
            },
            "customer_since":"2012-09-22T03:08:11.959Z"
          },
          "title": null,
          "category": "brand_profile",
          "created_at": "2016-07-29T03:08:11.959Z",
          "updated_at": "2016-07-29T03:08:11.959Z",
          "ticket_ids": [],
          "user_ids": [
            1
          ],
          "organization_ids": [],
          "record_ids": []
        },

        // order
        {
          "id": "af0e4fa4-5539-11e6-822e-22000b460299",
          "data": {
            "order": {
              "number":"084529425",
              "date":"2016-07-29",
              "store": {
                "name":"Santa Monica"
              },
              "foo":"bar"
            },
            "brand_key":"gucci"
          },
          "title": "",
          "category": "order",
          "created_at": "2016-07-29T03:08:11.959Z",
          "updated_at": "2016-07-29T03:08:11.959Z",
          "ticket_ids": [1],
          "user_ids": [1],
          "organization_ids": [],
          "record_ids": []
        }
      ];

      // map records on .done
      var recordsByCategory = _.groupBy(records, 'category');
      console.dir(recordsByCategory);

      var brandProfiles = _.map(recordsByCategory.brand_profile, function(brandProfile) {
        brandProfile.customer_since = moment(brandProfile.data.customer_since).fromNow();
        brandProfile["orders"] = _.filter(recordsByCategory.order, function(order) {
          return order.data.brand_key == brandProfile.data.brand.key;// if the brand keys match, assign the order to an array on the brandProfile
        });
        return brandProfile;
      });
      this.brandProfiles = brandProfiles;
      console.dir(brandProfiles);


      if(this.currentLocation() == 'user_sidebar') {
        this.listRecords(brandProfiles);
      } else if (this.currentLocation() == 'ticket_sidebar') {
        this.showRecord(brandProfiles);
      }
    },
    listRecords: function(brandProfiles) {

      // render Record list
      this.switchTo('user_records_list', {
        "brand_profiles": brandProfiles
        // "orders": recordsByCategory.order
      });
    },
    showRecord: function(brandProfiles) {
      console.dir(this.ticket().brand().id().toString());
      // render Record list
      var brandProfile = _.find(brandProfiles, function(brandProfile) {
        return this.ticket().brand().id().toString() == brandProfile.data.brand.id;
      }, this);
      console.dir(brandProfile);
      this.switchTo('ticket_record_show', {
        "brand_profile": brandProfile
        // "orders": recordsByCategory.order
      });
    }
   };

}());
