/* Définition de nos PINs pour chaque élément */
#include <SD.h>
#include <Adafruit_VC0706.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include "ComMotion.h"
#define SD_CS_PIN 53

Adafruit_VC0706 cam = Adafruit_VC0706(&Serial2);

#define PISTON_PWM 3
#define PISTON_DIR 23
#define PISTON_PWM_VALUE 255
#define PISTON_DELAI 20000

#define MOTEUR_PLATEFORME_PWM 4
#define MOTEUR_PLATEFORME_DIR 24
#define MOTEUR_PLATEFORME_PWM_VALUE 100
#define MOTEUR_PLATEFORME_DELAI 1650

#define CONVOYEUR_TREMIE_PWM_VALUE 255

#define CONVOYEUR_2_PWM 6
#define CONVOYEUR_2_DIR 26
#define CONVOYEUR_2_PWM_VALUE 100
#define CONVOYEUR_2_DELAI 5000

#define CONVOYEUR_3_PWM_VALUE 255
#define CONVOYEUR_3_DELAI 5000

#define MOTEUR_RAIL_PWM 5
#define MOTEUR_RAIL_DIR 25
#define MOTEUR_RAIL_PWM_VALUE 100
#define MOTEUR_RAIL_DELAI 10000

#define MOTEUR_PIVOT_PWM 6
#define MOTEUR_PIVOT_DIR 26
#define MOTEUR_PIVOT_PWM_VALUE 100
#define MOTEUR_PIVOT_DELAI 2000

#define PIR_SENSOR_PIN 22

int bac_actuel = 1;
bool esp_ready = false;

// Fonctions de contrôle des éléments
/* Controle du piston
 * sens = true -> il faut sortir le piston
 * sens = false -> il faut ranger le piston
 */
void piston(int sens) {
  if(sens) {
    digitalWrite(PISTON_DIR, HIGH);
  } else {
    digitalWrite(PISTON_DIR, LOW);
  }

  analogWrite(PISTON_PWM, PISTON_PWM_VALUE);
  delay(PISTON_DELAI);
  analogWrite(PISTON_PWM, 0);
}

/* Contrôle de la plateforme tournante
 * actuel : la partie actuellement tournée vers le convoyeur
 * destination : la partie à mettre devant le convoyeur
 */
bool sens_plateforme = true;
void plateforme (int actuel, int destination) {
  if(sens_plateforme) {
    for(int i = 0; i < abs(actuel - destination); i++) {
      digitalWrite(MOTEUR_PLATEFORME_DIR, HIGH);
      analogWrite(MOTEUR_PLATEFORME_PWM, MOTEUR_PLATEFORME_PWM_VALUE);
      delay(MOTEUR_PLATEFORME_DELAI);
      analogWrite(MOTEUR_PLATEFORME_PWM, 0);
    }
  } else {
    for(int i = max(actuel, destination); i > min(actuel, destination); i--) {
      digitalWrite(MOTEUR_PLATEFORME_DIR, LOW);
      analogWrite(MOTEUR_PLATEFORME_PWM, MOTEUR_PLATEFORME_PWM_VALUE);
      delay(MOTEUR_PLATEFORME_DELAI);
      analogWrite(MOTEUR_PLATEFORME_PWM, 0);
    }
  }
  bac_actuel = destination;
  sens_plateforme = !sens_plateforme;
  return;
}

/*
 * Contrôle des convoyeurs
 * numero : le convoyeur à altérer
 * action : true = lancement, false = arret
 */
int actual_conv[4] = {0, 0, 0, 100};
void convoyeur(int numero, bool action) {
  int pwm = 0;
  int dir = 0;
  int toWrite = 0;

  switch(numero) {
    case 1:
      if(action) {
        actual_conv[0] = CONVOYEUR_TREMIE_PWM_VALUE;
      } else {
        actual_conv[0] = 0;
      }
      break;

    case 2:
      if(action) {
        actual_conv[1] = CONVOYEUR_2_PWM_VALUE;
      } else {
        actual_conv[1] = 0;
      }
      break;

    case 3:
      if(action) {
        actual_conv[2] = CONVOYEUR_3_PWM_VALUE;
      } else {
        actual_conv[2] = 0;
      }
      break;

     default:
      break;
  }


  Serial.println("done");
  Serial.println(actual_conv[0]);
  Serial.println(actual_conv[1]);
  Serial.println(actual_conv[2]);
  IndividualMotorControl(actual_conv[0], actual_conv[1], actual_conv[2], actual_conv[3]);
  return;
}

/*
 *  Contrôle du rail du bac de récupération
 *  sens = true -> le rail doit aller vers la trémie
 *  sens = false -> le rail doit revenir de la trémie
 */
void rail(int sens) {
  if(sens) {
    digitalWrite(MOTEUR_RAIL_DIR, HIGH);
  } else {
    digitalWrite(MOTEUR_RAIL_DIR, LOW);
  }

  analogWrite(MOTEUR_RAIL_PWM, MOTEUR_RAIL_PWM_VALUE);
  delay(MOTEUR_RAIL_DELAI);
  analogWrite(MOTEUR_PLATEFORME_PWM, 0);
  return;
}

/*
 * Contrôle du pivot du bac de récupération
 * sens = true -> le bac doit se pencher vers la trémie
 * sens = false -> le bac doit se remettre droit
 */
void pivot(int sens) {
  if(sens) {
    digitalWrite(MOTEUR_PIVOT_DIR, HIGH);
  } else {
    digitalWrite(MOTEUR_PIVOT_DIR, LOW);
  }

  analogWrite(MOTEUR_PIVOT_PWM, MOTEUR_PIVOT_PWM_VALUE);
  delay(MOTEUR_PIVOT_DELAI);
  analogWrite(MOTEUR_PIVOT_PWM, 0);
  return;
}


// Fonctions qui seront directement appelées lorsqu'une certaine route est appelée sur l'ESP
/*
 * Route du lancement de la machine
 */
void route_lancement() {
  Serial.println("route_lancement");
  convoyeur(1, true);
  convoyeur(2, true);

  while(digitalRead(PIR_SENSOR_PIN) == LOW);

  convoyeur(1, false);
  convoyeur(2, false);
}

/*
 * Route nous disant de faire tomber une nouvelle pièce de la trémie et de la détecter
 */
void route_nouvelle_piece() {
  Serial.println("route_nouvelle_piece");
}

/*
 * Route nous disant de faire tomber la pièce ddans un bac
 * bac : le bac dans lequel doit tomber la pièce (4 = récupération)
 */
void route_sortir_piece(int bac) {
  Serial.print("route_sortir_piece -> bac=");
  Serial.println(bac);
}

/*
 * Route nous disant de sortir un bac plein, et d'en remettre un nouveau à la place
 * bac : le numéro du bac plein
 */
void route_changement_bac(int bac) {
  Serial.print("route_changement_bac -> bac=");
  Serial.println(bac);
}

/*
 * Route du lancement de la vidange du bac de récupération
 */
void route_vidange_bac_recuperation() {
  Serial.println("route_vidange_bac_recuperation");
}

/*
 * Route nous disant que la machine a fini de tourner, et qu'il faut donc la remettre à 0
 */
void route_reset_machine() {
  Serial.println("route_reset_machine");
}

/*
 * Route nous sommant de prendre une photo et de l'envoyer à l'ESP
 */
void route_prendre_photo() {
  Serial.println("route_prendre_photo");
  int size_of_block = 1024;
  // On prends la photo
  if (! cam.takePicture())
    Serial.println("Failed to snap!");
  else
    Serial.println("Picture taken!");

  // Create an image with the name IMAGExx.JPG
  char filename[14];
  strcpy(filename, "IMAGEJ~1.JPG");

  // Open the file for writing
  File imgFile = SD.open(filename, FILE_WRITE);

  // Get the size of the image (frame) taken
  uint16_t jpglen = cam.frameLength();
  Serial.print("Storing ");
  Serial.print(jpglen, DEC);
  Serial.print(" byte image.");

  int32_t my_time = millis();
  pinMode(8, OUTPUT);
  // Read all the data up to # bytes!
  byte wCount = 0; // For counting # of writes
  while (jpglen > 0) {
    // read 32 bytes at a time;
    uint8_t *my_buffer;
    uint8_t bytesToRead = min(64, jpglen); // change 32 to 64 for a speedup but may not work with all setups!
    my_buffer = cam.readPicture(bytesToRead);
    imgFile.write(my_buffer, bytesToRead);
    if(++wCount >= 64) { // Every 2K, give a little feedback so it doesn't appear locked up
      Serial.print('.');
      wCount = 0;
    }
    //Serial.print("Read ");  Serial.print(bytesToRead, DEC); Serial.println(" bytes");
    jpglen -= bytesToRead;
  }
  imgFile.close();

  // On envoie la photo à l'ESP
  File image_file = SD.open("IMAGEJ~1.JPG");

  if (image_file) {
    double size_of_file = image_file.size();
    Serial.print("Size of file: ");
    Serial.println(String(size_of_file));
    Serial1.println(String(size_of_file));
    // read from the file until there's nothing else in it:
    while (image_file.available()) {
      byte my_array[size_of_block];
      image_file.read(my_array, size_of_block);
      for(int i = 0; i < size_of_block; i++) {
        Serial1.write(my_array[i]);
        Serial.write(my_array[i]);
      }
      delay(500);
    }
    image_file.close();
    Serial.println("File sent");
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening image.jpg");
  }
}

void setup() {
  // On ouvre une communication serie hardware pour les messages destines au moniteur série
  Serial.begin(9600);
  Serial1.begin(115200);
  Serial2.begin(9600);

  // Configuration de nos sorties
  pinMode(PISTON_PWM, OUTPUT);
  pinMode(PISTON_DIR, OUTPUT);
  pinMode(MOTEUR_PLATEFORME_PWM, OUTPUT);
  pinMode(MOTEUR_PLATEFORME_DIR, OUTPUT);
  pinMode(MOTEUR_RAIL_PWM, OUTPUT);
  pinMode(MOTEUR_RAIL_DIR, OUTPUT);
  pinMode(MOTEUR_PIVOT_PWM, OUTPUT);
  pinMode(MOTEUR_PIVOT_DIR, OUTPUT);

  Wire.begin(1);
  BasicConfig(0,19,60,250,250,250,250,0,1);

  Serial.println("Starting ComMotion3 ...");
  IndividualMotorControl(0,0,0,0);

  if(SD.begin(SD_CS_PIN)) {
    Serial.println("SD Card OK");
  } else {
    Serial.println("SD Card K.O");
  }

  // Initialisation de la caméra
  if (cam.begin()) {
    Serial.println("Camera Found:");
  } else {
    Serial.println("No camera found?");
    //return;
  }

  cam.setImageSize(VC0706_640x480);



  my_time = millis() - my_time;
  Serial.println("done!");
  Serial.print(my_time); Serial.println(" ms elapsed");
  */

  Serial.println("Arduino Pret");
  //rail(true);
  piston(true);
  piston(false);
  /*
  convoyeur(1, true);
  delay(2000);
  //convoyeur(1, false);
  convoyeur(2, true);
  delay(2000);
  //convoyeur(2, false);
  convoyeur(3, true);
  delay(2000);
  //convoyeur(3, false);
  */



}

int done = 0;

void loop() {
  if(esp_ready) {
    if (Serial1.available() > 0) {
      String ordre = Serial1.readStringUntil('\n');
      char c;
      int bac;
      Serial.print("Ordre: ");
      Serial.println(ordre);
      if(ordre == "lancement\r") {
        route_lancement();

      } else if(ordre == "nouvelle_piece\r") {
        route_nouvelle_piece();

      } else if(ordre == "sortir_piece\r") {
        bac = Serial1.read();
        if(bac > 3) {
          bac -= 48;
        }
        route_sortir_piece(bac);

      } else if(ordre == "changement_bac\r") {
        bac = Serial1.read();
        if(bac > 3) {
          bac -= 48;
        }
        route_changement_bac(bac);

      } else if(ordre == "vidange_bac_recuperation\r") {
        route_vidange_bac_recuperation();

      } else if(ordre == "reset_machine\r") {
        route_reset_machine();

      } else if(ordre == "prendre_photo\r") {
        route_prendre_photo();

      }
    }
  } else {
    if (Serial1.available() > 0) {
      byte new_byte = Serial1.read();
      if(new_byte <= 126) {
        if(new_byte == 90) {
          esp_ready = true;
          Serial.println("ESP ready !");
        }
      }
    }
  }
}
