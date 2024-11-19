import { sleep, check, group, fail } from "k6";
import http from "k6/http";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 5, duration: "30s" },
        { target: 15, duration: "1m" },
        { target: 10, duration: "30s" },
        { target: 0, duration: "30s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  group("page_1 - https://pizza.stevencs329.com/", function () {
    response = http.get("https://pizza.stevencs329.com/", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        dnt: "1",
        priority: "u=0, i",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
      },
    });
    sleep(7.9);

    // Login
    response = http.put(
      "https://pizza-service.stevencs329.com/api/auth",
      '{"email":"asdf@asdf.com","password":"asdf"}',
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          dnt: "1",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );
    if (
      !check(response, {
        "status equals 200": (response) => response.status.toString() === "200",
      })
    ) {
      console.log(response.body);
      fail("Login was *not* 200");
    }

    response = http.options(
      "https://pizza-service.stevencs329.com/api/auth",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "content-type",
          "access-control-request-method": "PUT",
          "cache-control": "no-cache",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );
    sleep(4.7);

    response = http.get(
      "https://pizza-service.stevencs329.com/api/order/menu",
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          dnt: "1",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );

    response = http.options(
      "https://pizza-service.stevencs329.com/api/order/menu",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "GET",
          "cache-control": "no-cache",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );

    response = http.get("https://pizza-service.stevencs329.com/api/franchise", {
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        dnt: "1",
        origin: "https://pizza.stevencs329.com",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-gpc": "1",
      },
    });

    response = http.options(
      "https://pizza-service.stevencs329.com/api/franchise",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "GET",
          "cache-control": "no-cache",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );
    sleep(9.7);

    response = http.post(
      "https://pizza-service.stevencs329.com/api/order",
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          dnt: "1",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );

    response = http.options(
      "https://pizza-service.stevencs329.com/api/order",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "POST",
          "cache-control": "no-cache",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
        },
      }
    );
    sleep(2.3);

    response = http.post(
      "https://pizza-factory.cs329.click/api/order/verify",
      '{"jwt":"eyJpYXQiOjE3MzIwNDk1MzgsImV4cCI6MTczMjEzNTkzOCwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJzbWl0Y2hlOCIsIm5hbWUiOiJTdGV2ZW4gTWl0Y2hlbGwifSwiZGluZXIiOnsiaWQiOjYsIm5hbWUiOiJhc2RmIiwiZW1haWwiOiJhc2RmQGFzZGYuY29tIn0sIm9yZGVyIjp7Iml0ZW1zIjpbeyJtZW51SWQiOjEsImRlc2NyaXB0aW9uIjoiVmVnZ2llIiwicHJpY2UiOjAuMDAzOH1dLCJzdG9yZUlkIjoiMSIsImZyYW5jaGlzZUlkIjoxLCJpZCI6Mn19.d972UxN6mD8mOVVr3BIKOPHcyBJxW8u_069U98jB0-oKiREt_tX8ymLG3MXG28Tdk1Mh_o8N7uIKIkYDNOykFdKdXpcwoHrsmLulQYEmKc71LqsYvHpCc168YsIILuMcBSdnoL5Nu7_F_2bBt7DrbxR7zDfwgqaAJYjt-d8w6RWm9L1PMfYXt8WnQPdAu4jCS4BpSiKwTLjrJaIYL2NoT8t2-u_KL0BBbrslYCcuinep50fgcwqKaWM_biItjeUHkJTlo-Wqckmt3A4L1K5jO_dnbnm4fzRkUchCwTpEl04Ulu15Rt70u6acQuGLZ5_6Xdn_gUYqV_X-9c7ULAv0EBaszKIjmAj7ndDzN1ip88xHzkrxthjlET-_INuLlqVetdJiWuLA7BK1p8Ksa_eS1b0XpQ_zR1h1zbHfHhf2ZpfBu0D45CCKRy4cTWsDVThoG6Tct9n58hsGCIai41rAlgXOpOBVBF-5LqshbP3yk9oHn8J-yEvhHT4ubxh9k9cSXUx3fkic58O7GWeLj40V5YE0OaldDtVGclOm02bhWj3oi9Zc8ajsCPuITsv6EBiLLQEMl3CCF16ztSgsk3Zzgf7QDI_UQaLUxQN6ObFwPH0Y3PElEvy-jyu3WPHzbS5RqifvF7DtBTRsW1X8ppuLeVJ_TJE-I5pcorx9puis21c"}',
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          dnt: "1",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "sec-gpc": "1",
        },
      }
    );

    response = http.options(
      "https://pizza-factory.cs329.click/api/order/verify",
      null,
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.9",
          "access-control-request-headers": "authorization,content-type",
          "access-control-request-method": "POST",
          "cache-control": "no-cache",
          origin: "https://pizza.stevencs329.com",
          priority: "u=1, i",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "sec-gpc": "1",
        },
      }
    );
  });
}
