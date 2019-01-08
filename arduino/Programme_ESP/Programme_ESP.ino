#include <stdio.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <math.h>
#include <stdint.h>

#define HTTP_REST_PORT 80
#define WIFI_RETRY_DELAY 500
#define MAX_WIFI_INIT_RETRY 50

const char* wifi_ssid = "Motocyclette";
const char* wifi_passwd = "biteaucarre";

/* Fonctions d'initialisation du serveur WiFi HTTP
 *
 */
ESP8266WebServer http_rest_server(HTTP_REST_PORT);

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

void config_rest_server_routing() {
    http_rest_server.on("/", HTTP_GET, []() {
        http_rest_server.send(200, "text/html",
            "Welcome to the ESP8266 REST Web Server");
    });

    // Définition de nos routes
    http_rest_server.on("/lancement", HTTP_GET, lancement);
    http_rest_server.on("/nouvelle_piece", HTTP_GET, nouvelle_piece);
    http_rest_server.on("/sortir_piece", HTTP_POST, sortir_piece);
    http_rest_server.on("/changement_bac", HTTP_POST, changement_bac);
    http_rest_server.on("/vidange_bac_recuperation", HTTP_GET, vidange_bac_recuperation);
    http_rest_server.on("/reset_machine", HTTP_GET, reset_machine);
    http_rest_server.on("/prendre_photo", HTTP_GET, prendre_photo);
}

/* Fonctions de contrôle appelées selon l'URL appelée
 * Ces fonctions ne s'occupent que d'envoyer un ordre, symbolisé par une lettre, à l'Arduino
 */
// Lancement de la machine: GET
void lancement() {
  Serial.println("\nlancement");
  http_rest_server.send(204);
}

// Il faut faire tomber une pièce de la trémie: GET
void nouvelle_piece() {
  Serial.println("\nnouvelle_piece");
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

  JsonObject& jsonBody = jsonBuffer.parseObject(post_body_ok);

  if (!jsonBody.success()) {
      http_rest_server.send(400);
  }
  else {
      int bac = jsonBody["bac"]; // On récupère le bac dans lequel la pièce doit aller
      if(bac >= 1 && bac <= 4) {
        Serial.println("\nsortir_piece");
        Serial.print(bac);
        http_rest_server.send(204);
      } else {
        http_rest_server.send(404);
      }
  }
}

/* Il faut retirer un bac qui est plein: POST
 * bac : le bac à changer
 */
void changement_bac() {
  StaticJsonBuffer<500> jsonBuffer;
  String post_body = http_rest_server.arg("plain");

  char post_body_ok[post_body.length()+1];
  post_body.toCharArray(post_body_ok, post_body.length()+1);

  JsonObject& jsonBody = jsonBuffer.parseObject(post_body_ok);

  if (!jsonBody.success()) {
      http_rest_server.send(400);
  }
  else {
      int bac = jsonBody["bac"]; // On récupère le bac dans lequel la pièce doit aller
      if(bac >= 1 && bac < 4) {
        Serial.println("\nchangement_bac");
        Serial.print(bac);
        http_rest_server.send(204);
      } else {
        http_rest_server.send(404);
      }
  }
}

// Il faut vidanger le bac de récupération: GET
void vidange_bac_recuperation() {
  Serial.println("\nvidange_bac_recuperation");
  http_rest_server.send(204);
}

// Il faut remettre la machine à 0: GET
void reset_machine() {
  Serial.println("\nreset_machine");
  http_rest_server.send(204);
}

// On transforme un array de bytes en string littéral 
String array_to_string(byte my_array[], unsigned int len)
{
    
    char my_buffer[len*2+1];
    byte nib1, nib2;
    
    for (unsigned int i = 0; i < len; i++)
    {
        nib1 = (my_array[i] >> 4) & 0x0F;
        nib2 = (my_array[i] >> 0) & 0x0F;
        my_buffer[i*2+0] = nib1  < 0xA ? '0' + nib1  : 'A' + nib1  - 0xA;
        my_buffer[i*2+1] = nib2  < 0xA ? '0' + nib2  : 'A' + nib2  - 0xA;
    }
    
    my_buffer[len*2] = '\0';
    return String(my_buffer);
    
    /*
    String my_buffer = "";
    byte nib1, nib2;
    
    for (unsigned int i = 0; i < len; i++)
    {
        nib1 = (my_array[i] >> 4) & 0x0F;
        nib2 = (my_array[i] >> 0) & 0x0F;
        my_buffer += nib1  < 0xA ? '0' + nib1  : 'A' + nib1  - 0xA;
        my_buffer += nib2  < 0xA ? '0' + nib2  : 'A' + nib2  - 0xA;
    }
    
    my_buffer += '\0';
    return my_buffer;
    */
}

// Le serveur a demandé une photo: GET
void prendre_photo() {
  int length_of_block = 1024;
  int number_of_blocks;
  byte message[length_of_block];

  send_message("Starting photo !");

  String size_as_string;
  double size_of_file = double(0);
  //  Waiting to be sure Arduino has received message
  while(size_of_file == double(0)) {
    Serial.println("\nprendre_photo");
    size_as_string = Serial.readStringUntil('\n');
    size_as_string.remove(size_as_string.length()-3, 2);
    size_of_file = size_as_string.toFloat();
    number_of_blocks = ceil(size_of_file / length_of_block);
  }

  http_post_request("http://192.168.43.136:5002/begin_picture", String(size_of_file, 2));
 
  for(int i = 0; i < number_of_blocks; i++) {
    Serial.readBytes(message, length_of_block);
    http_post_request("http://192.168.43.136:5002/picture_content", array_to_string(message, length_of_block));
    delay(100);
  }

  send_message("Photo finished ! :D");
}

/* Send a message just for the API to print it */
void send_message(String message) {
  http_post_request("http://192.168.43.136:5002/print_message", message);
}

// Fonctions appelées pour envoyer des requetes HTTP
/*
 * Envoie d'une requête GET
 */
void http_get_request(String url) {
  HTTPClient http;
  http.begin(url);
  int httpCode = http.GET();
  String payload = http.getString();
  //Serial.println(payload);
  http.end();
  //Serial.print("GET request sent to: ");
  //Serial.println(url);
}

/*
 * Envoi d'une requête POST
 */
void http_post_request(String url, String data) {
  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "text/plain");
  int httpCode = http.POST(data);
  String payload = http.getString();
  //Serial.println(payload);
  http.end();
  //Serial.print("POST request sent to: ");
  //Serial.println(url);
}


void setup(void) {
    delay(5000);
    Serial.begin(115200);
    Serial.setTimeout(2000);
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
    send_message("ESP READY !");

    //http_get_request("http://192.168.43.136:5002/end_of_tour");
    //delay(2500);
    //http_post_request("http://192.168.43.136:5002/identify_piece");
}

void loop(void) {
    http_rest_server.handleClient();
    /*
    if (Serial.available() > 0) {
      byte new_byte = Serial.read();
      switch(new_byte) {
        case 71:
          send_photo("http://192.168.43.136:5002/identify_piece");
          break;
      }
    }
    */
}
