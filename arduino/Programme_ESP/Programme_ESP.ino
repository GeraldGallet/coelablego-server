#include <stdio.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

#define HTTP_REST_PORT 80
#define WIFI_RETRY_DELAY 500
#define MAX_WIFI_INIT_RETRY 50

struct Led {
    byte id;
    byte gpio;
    byte status;
} led_resource;

const char* wifi_ssid = "Motocyclette";
const char* wifi_passwd = "biteaucarre";

ESP8266WebServer http_rest_server(HTTP_REST_PORT);

void init_led_resource()
{
    led_resource.id = 0;
    led_resource.gpio = 0;
    led_resource.status = LOW;
}

int init_wifi() {
    int retries = 0;

    Serial.println("Connecting to WiFi AP..........");

    WiFi.mode(WIFI_STA);
    WiFi.begin(wifi_ssid, wifi_passwd);
    // check the status of WiFi connection to be WL_CONNECTED
    while ((WiFi.status() != WL_CONNECTED) && (retries < MAX_WIFI_INIT_RETRY)) {
        retries++;
        delay(WIFI_RETRY_DELAY);
        Serial.print("#");
    }
    return WiFi.status(); // return the WiFi connection status
}

void get_leds() {
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& jsonObj = jsonBuffer.createObject();
    char JSONmessageBuffer[200];

    if (led_resource.id == 0)
        http_rest_server.send(204);
    else {
        jsonObj["id"] = led_resource.id;
        jsonObj["gpio"] = led_resource.gpio;
        jsonObj["status"] = led_resource.status;
        jsonObj.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
        http_rest_server.send(200, "application/json", JSONmessageBuffer);
    }
}

void json_to_resource(JsonObject& jsonBody) {
    int id, gpio, status;

    id = jsonBody["id"];
    gpio = jsonBody["gpio"];
    status = jsonBody["status"];

    Serial.println(id);
    Serial.println(gpio);
    Serial.println(status);

    led_resource.id = id;
    led_resource.gpio = gpio;
    led_resource.status = status;
}

void post_put_leds() {
    StaticJsonBuffer<500> jsonBuffer;
    String post_body = http_rest_server.arg("plain");
    
    char post_body_ok[post_body.length()+1];
    post_body.toCharArray(post_body_ok, post_body.length()+1);
    Serial.print("BODY: ");
    Serial.println(post_body_ok);
    
    JsonObject& jsonBody = jsonBuffer.parseObject(post_body_ok);

    Serial.print("HTTP Method: ");
    Serial.println(http_rest_server.method());
    
    if (!jsonBody.success()) {
        Serial.println("error in parsin json body");
        http_rest_server.send(400);
    }
    else {   
        if (http_rest_server.method() == HTTP_POST) {
            if ((jsonBody["id"] != 0) && (jsonBody["id"] != led_resource.id)) {
                json_to_resource(jsonBody);
                http_rest_server.sendHeader("Location", "/leds/" + String(led_resource.id));
                http_rest_server.send(201);
                pinMode(led_resource.gpio, OUTPUT);
            }
            else if (jsonBody["id"] == 0)
              http_rest_server.send(404);
            else if (jsonBody["id"] == led_resource.id)
              http_rest_server.send(409);
        }
        else if (http_rest_server.method() == HTTP_PUT) {
            if (jsonBody["id"] == led_resource.id) {
                json_to_resource(jsonBody);
                http_rest_server.sendHeader("Location", "/leds/" + String(led_resource.id));
                http_rest_server.send(200);
                digitalWrite(led_resource.gpio, led_resource.status);
            }
            else
              http_rest_server.send(404);
        }
    }
}

/* Fonctions de contrôle appelées selon l'URL appelée 
 * Ces fonctions ne s'occupent que d'envoyer un ordre, symbolisé par une lettre, à l'Arduino
 */
// Lancement de la machine: GET
void lancement() {
  Serial.print("A");
  http_rest_server.send(204);
}

// Il faut faire tomber une pièce de la trémie: GET
void nouvelle_piece() {
  Serial.print("B");
  http_rest_server.send(204);
}

/* Il faut faire tomber la pièce dans un des bacs: POST
 *  bac : le numéro du bac dans lequel il faut faire tomber la pièce
 */
void sortir_piece() {
  StaticJsonBuffer<500> jsonBuffer;
  String post_body = http_rest_server.arg("plain");
  
  char post_body_ok[post_body.length()+1];
  post_body.toCharArray(post_body_ok, post_body.length()+1);
  Serial.print("BODY: ");
  Serial.println(post_body_ok);
  
  JsonObject& jsonBody = jsonBuffer.parseObject(post_body_ok);

  Serial.print("HTTP Method: ");
  Serial.println(http_rest_server.method());
  
  if (!jsonBody.success()) {
      Serial.println("error in parsin json body");
      http_rest_server.send(400);
  }
  else {   
      int bac = jsonBody["bac"]; / /On récupère le bac dans lequel la pièce doit aller
      if(bac >= 1 && bac <= 4) {
        Serial.print("C");
        Serial.print(bac);
        http_rest_server.send(204);
      } else {
        http_rest_server.send(404);
      }
  }
}

/* Il faut retirer un bac qui est vide
 * bac : le bac à changer
 */
void changement_bac(bac) {
  StaticJsonBuffer<500> jsonBuffer;
  String post_body = http_rest_server.arg("plain");
  
  char post_body_ok[post_body.length()+1];
  post_body.toCharArray(post_body_ok, post_body.length()+1);
  Serial.print("BODY: ");
  Serial.println(post_body_ok);
  
  JsonObject& jsonBody = jsonBuffer.parseObject(post_body_ok);

  Serial.print("HTTP Method: ");
  Serial.println(http_rest_server.method());
  
  if (!jsonBody.success()) {
      Serial.println("error in parsin json body");
      http_rest_server.send(400);
  }
  else {   
      int bac = jsonBody["bac"]; / /On récupère le bac dans lequel la pièce doit aller
      if(bac >= 1 && bac <= 4) {
        Serial.print("D");
        Serial.print(bac);
        http_rest_server.send(204);
      } else {
        http_rest_server.send(404);
      }
  }
}

/* Il faut vidanger le bac de récupération */
void vidange_bac_recuperation() {
  Serial.print("E");
  http_rest_server.send(204);
}

/* La machine a fini de fonctionner */
void fin() {
  Serial.print("F");
  http_rest_server.send(204);
}


void config_rest_server_routing() {
    http_rest_server.on("/", HTTP_GET, []() {
        http_rest_server.send(200, "text/html",
            "Welcome to the ESP8266 REST Web Server");
    });
    http_rest_server.on("/leds", HTTP_GET, get_leds);
    http_rest_server.on("/leds", HTTP_POST, post_put_leds);
    http_rest_server.on("/leds", HTTP_PUT, post_put_leds);

    // Définition de nos routes
    http_rest_server.on("/lancement", HTTP_GET, lancement);
    http_rest_server.on("/nouvelle_piece", HTTP_GET, nouvelle_piece);
    http_rest_server.on("/sortir_piece", HTTP_POST, sortir_piece);
    http_rest_server.on("/changement_bac", HTTP_POST, changement_bac);
    http_rest_server.on("/vidange_bac_recuperation", HTTP_GET, vidange_bac_recuperation);
    http_rest_server.on("/fin", HTTP_GET, fin);
}

void setup(void) {
    delay(5000);
    Serial.begin(115200);

    init_led_resource();
    if (init_wifi() == WL_CONNECTED) {
        Serial.print("Connected to ");
        Serial.print(wifi_ssid);
        Serial.print("--- IP: ");
        Serial.println(WiFi.localIP());
    }
    else {
        Serial.print("Error connecting to: ");
        Serial.println(wifi_ssid);
    }

    config_rest_server_routing();

    http_rest_server.begin();
    Serial.println("HTTP REST Server Started");
    Serial.write(90);
}

void loop(void) {
    http_rest_server.handleClient();
}
