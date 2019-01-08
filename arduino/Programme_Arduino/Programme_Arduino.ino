/* Définition de nos PINs pour chaque élément */
#include <SD.h>
#define SD_CS_PIN 53

#define PISTON_PWM 3
#define PISTON_DIR 23
#define PISTON_PWM_VALUE 100
#define PISTON_DELAI 2000

#define MOTEUR_PLATEFORME_PWM 4
#define MOTEUR_PLATEFORME_DIR 24
#define MOTEUR_PLATEFORME_PWM_VALUE 255
#define MOTEUR_PLATEFORME_DELAI 765

#define CONVOYEUR_TREMIE_PWM 5
#define CONVOYEUR_TREMIE_DIR 25
#define CONVOYEUR_TREMIE_PWM_VALUE 100

#define CONVOYEUR_2_PWM 6
#define CONVOYEUR_2_DIR 26
#define CONVOYEUR_2_PWM_VALUE 100
#define CONVOYEUR_2_DELAI

#define CONVOYEUR_3_PWM 7
#define CONVOYEUR_3_DIR 27
#define CONVOYEUR_3_PWM_VALUE 100
#define CONVOYEUR_3_DELAI 2000

#define MOTEUR_RAIL_PWM 8
#define MOTEUR_RAIL_DIR 28
#define MOTEUR_RAIL_PWM_VALUE 100
#define MOTEUR_RAIL_DELAI 10000

#define MOTEUR_PIVOT_PWM 9
#define MOTEUR_PIVOT_DIR 29
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
void plateforme (int actuel, int destination) {
  for(int i = 0; i < abs(actuel - destination); i++) {
    digitalWrite(MOTEUR_PLATEFORME_DIR, HIGH);
    analogWrite(MOTEUR_PLATEFORME_PWM, MOTEUR_PLATEFORME_PWM_VALUE);
    delay(MOTEUR_PLATEFORME_DELAI);
    analogWrite(MOTEUR_PLATEFORME_PWM, 0);
  }
  bac_actuel = destination;
  
  return;
}

/*
 * Contrôle des convoyeurs
 * numero : le convoyeur à altérer
 * action : true = lancement, false = arret
 */
void convoyeur(int numero, bool action) {
  int pwm = 0;
  int dir = 0;
  int toWrite = 0;
  switch(numero) {
    case 1:
      pwm = CONVOYEUR_TREMIE_PWM;
      dir = CONVOYEUR_TREMIE_DIR;
      if(action) {
        toWrite = CONVOYEUR_TREMIE_PWM_VALUE;
      }
      break;
      
    case 2:
      pwm = CONVOYEUR_2_PWM;
      dir = CONVOYEUR_2_DIR;
      if(action) {
        toWrite = CONVOYEUR_2_PWM_VALUE;
      }
      break;

    case 3:
      pwm = CONVOYEUR_3_PWM;
      dir = CONVOYEUR_3_DIR;
      if(action) {
        toWrite = CONVOYEUR_3_PWM_VALUE;
      }
      break;

     default:
      break;
  }

  digitalWrite(dir, HIGH);
  analogWrite(pwm, toWrite);
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

  digitalWrite(MOTEUR_RAIL_PWM, MOTEUR_RAIL_PWM_VALUE);
  delay(MOTEUR_RAIL_DELAI);
  digitalWrite(MOTEUR_RAIL_PWM, 0);
  return;
}

/*
 * Contrôle du pivot du bac de récupération
 * sens = true -> le bac doit se pencher vers la trémie
 * sens = false -> le bac doit se remettre droit
 */
void pivot(int sens) {
  if(sens) {

  } else {

  }
  return;
}


// Fonctions qui seront directement appelées lorsqu'une certaine route est appelée sur l'ESP
/*
 * Route du lancement de la machine
 */
void route_lancement() {
  Serial.println("route_lancement");
  //convoyeur(1, true);
  //convoyeur(2, true);
  plateforme(1, 3);
  piston(true);

  while(digitalRead(PIR_SENSOR_PIN) == LOW);

  plateforme(3, 1);
  piston(false);
  //convoyeur(1, false);
  //convoyeur(2, false);
  //lancement();
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
  // Prendre la photo
  Serial.println("route_prendre_photo");
  int size_of_block = 1024;
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
  // On ouvre la communication serie software pour l'ESP8266
  Serial1.begin(115200);

  // Configuration de nos sorties
  pinMode(PISTON_PWM, OUTPUT);
  pinMode(PISTON_DIR, OUTPUT);
  pinMode(CONVOYEUR_TREMIE_PWM, OUTPUT);
  pinMode(CONVOYEUR_TREMIE_DIR, OUTPUT);
  pinMode(CONVOYEUR_2_PWM, OUTPUT);
  pinMode(CONVOYEUR_2_DIR, OUTPUT);

  if(SD.begin(SD_CS_PIN)) {
    Serial.println("SD Card OK");
  } else {
    Serial.println("SD Card K.O");
  }

  Serial.println("Arduino Pret");
  //plateforme(1, 3);
  //piston(true);
  //piston(false);
  //route_lancement();
  convoyeur(1, true);
  delay(10000);
  convoyeur(1, false);
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
        c = Serial1.read();
        bac = c - '0';
        route_sortir_piece(bac);

      } else if(ordre == "changement_bac\r") {
        //c = Serial1.read();
        //bac = c - '0';
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
