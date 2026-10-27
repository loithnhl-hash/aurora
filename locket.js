const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// 1. Giả lập gói mua hàng Gold qua RevenueCat (nếu có cấu trúc subscriber)
if (obj.subscriber) {
    var locket02 = {
      is_sandbox: !1,
      ownership_type: "PURCHASED",
      billing_issues_detected_at: null,
      period_type: "normal",
      expires_date: "2099-12-18T01:04:17Z",
      grace_period_expires_date: null,
      unsubscribe_detected_at: null,
      original_purchase_date: "2024-04-12T01:04:18Z",
      purchase_date: "2024-04-12T01:04:17Z",
      store: "app_store"
    };

    var locket01 = {
      grace_period_expires_date: null,
      purchase_date: "2024-04-12T01:04:17Z",
      product_identifier: "com.locket02.premium.yearly",
      expires_date: "2099-12-18T01:04:17Z"
    };

    const match = Object.keys(mapping).find(e => ua.includes(e));

    if (match) {
      let [e, s] = mapping[match];
      s ? (locket01.product_identifier = s, obj.subscriber.subscriptions[s] = locket02) : obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02, obj.subscriber.entitlements[e] = locket01;
    } else {
      obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket02;
      obj.subscriber.entitlements.pro = locket01;
    }
}

// 2. Kích hoạt toàn bộ các cờ tính năng và upsell từ dữ liệu API thực tế của Locket
if (obj.data) {
    if (obj.data.experiments) {
        // Mở khóa toàn bộ tính năng cao cấp trong upsell_features
        if (obj.data.experiments.upsell_features) {
            try {
                let upsell = JSON.parse(obj.data.experiments.upsell_features);
                upsell.app_icon_picker = true;
                upsell.camera_roll = true;
                upsell.camera_theme = true;
                upsell.locket_views = true;
                upsell.remove_ads = true;
                upsell.custom_widget_frames = true;
                obj.data.experiments.upsell_features = JSON.stringify(upsell);
            } catch (err) {}
        }

        // Chuyển toàn bộ cờ trong feature_gates thành subscriber
        if (obj.data.experiments.feature_gates) {
            try {
                let gates = JSON.parse(obj.data.experiments.feature_gates);
                for (let key in gates) {
                    gates[key] = "subscriber";
                }
                obj.data.experiments.feature_gates = JSON.stringify(gates);
            } catch (err) {}
        }
    }

    if (obj.data.purchases_entitlement) {
        obj.data.purchases_entitlement = "Gold";
    }
}

$done({ body: JSON.stringify(obj) });
