/* Définition de nos PINs pour chaque partie */
#define PISTON_PWM 2
#define PISTON_DIR 22
#define PISTON_PWM_VALUE 100

int bac_actuel = 1;

bool esp_ready = false;

// Fonctions de contrôle des éléments
/* Controle du piston
 * sens = true -> il faut sortir le piston
 * sens = false -> il faut ranger le piston
 */
void piston(sens) {
  if(sens) {
    digitalWrite(PISTON_DIR, HIGH);
  } else {
    digitalWrite(PISTON_DIR, LOW);
  }
  
  analogWrite(PISTON_PWM, PISTON_PWM_VALUE);
  delay(10000);
  analogWrite(PISTON_PWM, 0);
}

/* Contrôle de la plateforme tournante 
 * actuel : la partie actuellement tournée vers le convoyeur
 * destination : la partie à mettre devant le convoyeur
 */
void plateforme (actuel, destination) {
  bac_actuel = destination;
  return;
}

/*
 * Contrôle des convoyeurs
 * numero : le convoyeur à altérer
 * action : true = lancement, false = arret
 */
void convoyeur(numero, action) {

  return;
}

/* 
 *  Contrôle du rail du bac de récupération
 *  sens = true -> le rail doit aller vers la trémie
 *  sens = false -> le rail doit revenir de la trémie
 */
void rail(sens) {
  if(sens) {
    
  } else {
    
  }
  return;
}

/*
 * Contrôle du pivot du bac de récupération
 * sens = true -> le bac doit se pencher vers la trémie
 * sens = false -> le bac doit se remettre droit
 */
void pivot(sens) {
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
void route_sortir_piece(bac) {
  Serial.print("route_sortir_piece -> bac=");
  Serial.println(bac);
}

/*
 * Route nous disant de sortir un bac plein, et d'en remettre un nouveau à la place
 * bac : le numéro du bac plein
 */
void route_sortir_bac(bac) {
  Serial.print("route_sortir_bac -> bac=");
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
void route_fin() {
  Serial.println("route_fin");
}


void setup() {
  // On ouvre une communication serie hardware pour les messages destines au moniteur série
  Serial.begin(9600);
  // On ouvre la communication serie software pour l'ESP8266
  Serial1.begin(115200);

  // Configuration de nos sorties
  pinMode(PISTON_PWM, OUTPUT);
  pinMode(PISTON_DIR, OUTPUT);

  Serial.println("Arduino Pret");
}

void loop() {
  digitalWrite(ESP_ALIMENTATION, HIGH);
  if(esp_ready) {
    if (Serial1.available() > 0) {
      byte new_byte = Serial1.read();
      if(new_byte == 65) {
        route_lancement();
      }
  
      if(new_byte == 66) {
        route_nouvelle_piece();
      }
  
      if(new_byte == 67) {
        char c = Serial1.read();
        int bac = c - '0';
        route_sortir_piece(bac);
      }
  
      if(new_byte == 68) {
        char c = Serial1.read();
        int bac = c - '0';
        route_sortir_bac(bac);
      }
  
      if(new_byte == 69) {
        route_vidange_bac_recuperation();
      }

      if(new_byte == 70) {
        route_fin();
      }
    }
  } else {
    if (Serial1.available() > 0) {
      byte new_byte = Serial1.read();
      if(new_byte <= 126) {
        //Serial.write(new_byte);
        if(new_byte == 90) {
          esp_ready = true;
          Serial.println("ESP ready !");
        }   
      }
    }
  }
}
