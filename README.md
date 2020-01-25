# Teamscan

Teamscan is een project van de minor Usable App Development. Ontwikkeld voor De Haagse Hogeschool.
## Project

### Leden
- Charlie Vierling
- Stan Ravensbergen
- Jeroen van Rossum
- Jeremy Hut

### Repository bevat

#### App
De benodigdheden voor de front-end. Hiermee kan de app geupload worden naar FTP of de Play Store.

##### Installatie
Ga naar de juiste map.
```
cd app
```
Installeer afhankelijkheden
```
npm install
```
In auth.service.ts is de `apiUrl` en `dashboardURL` aan te passen naar het juiste adres.

##### Gebruik
###### Live-testen in de browser
```
ionic serve
```
###### Exporteren voor web
```
ionic build
```
Kopieer de www-map vervolgens naar de FTP.

###### Exporteren voor Android
```
ionic cordova run android
```
of voor een unsigned release apk:
```
ionic cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore teamscan.keystore app-release-unsigned.apk android-app-key
zipalign -v 4 app-release-unsigned.apk app-release.apk
```

#### Server
De benodigdheden voor de back-end.

##### API configuratie
Installeer een MYSQL-database en importeer de databasestructuur.
Voer in db.php de juiste inloggegevens in voor de connectie met de MYSQL-database.

##### Webapp configuratie
Voor de website (de export van de www-map na `ionic build`) is het belangrijk dat elk request dat niet naar een bestaand bestand leidt omgeleid wordt naar index.html.

###### Azure
Bij Azure zijn er tevens regels meegenomen voor de ondersteuning van json- en webmanifest-bestanden.
Plaats een bestand web.config in deze map met de volgende inhoud:
```
<configuration>
  <system.webServer>
		<staticContent>
		  <remove fileExtension=".json"/>
		  <mimeMap fileExtension=".json" mimeType="application/json"/>
		  <remove fileExtension=".webmanifest"/>
		  <mimeMap fileExtension=".webmanifest" mimeType="application/manifest+json"/>
		</staticContent>
    <rewrite>
      <rules>
				<rule name="rule 2p" stopProcessing="true">
					<match url="^"  />
					<conditions>
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
						<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
					</conditions>
					<action type="Rewrite" url="/index.html"  />
				</rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
###### Apache
Plaats een bestand genaamd .htaccess in de map met deze inhoud:
```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
```

##### Dashboard
Plaats de code van het dashboard in een locatie en zorg ervoor dat er in de app het juiste adres is geconfigureerd, zie bovenstaand. In db.php moet wederom de juiste databaseconnectie worden geconfigureerd.
