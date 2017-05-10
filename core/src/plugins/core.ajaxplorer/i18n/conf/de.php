<?php
/*
* Copyright 2007-2014 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
* This file is part of Pydio.
*
* Pydio is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* Pydio is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
*
* The latest code can be found at <https://pydio.com>.
*/

/*******************************************************************************
* German translation:
*   + update: Axel Otterstätter <axel.otterstaetter@googlemail.com>
*   + update: Stefan Huber <sh@signalwerk.ch>
*   + update: Martin Schaible <martin@martinschaible.ch>
*******************************************************************************/  

/* Do not use HTML entities! It would mess up everything */ 
$mess=array(
"Main"      => "Allgemein",
"App Title" => "Anwendungsname",
"Your application title" => "Dieser Title wird auf dem Begrüssungsbildschirm als Fenstertitel angezeigt",
"Main container for core Pydio settings (application title, sharing, webdav server config, etc...)" => "Allgemeine Einstellungen für Pydio (Applikations-Titel, Freigaben, webDAV-Server Konfiguration, usw.)",
"Default Language" => "Standardsprache",
"Default language when a user does not have set his/her own." => "Sprache die vorausgewählt ist, wenn der Benutzer keine abweichende konfiguriert.",
"Sharing" => "Freigaben",
"Download Folder (Legacy)" => "Download-Ordner (veraltet)",
"Absolute path to the public folder where temporary download links will be created. This is used for legacy purpose, newly created links do not use it anymore, but use the Base URI instead." => "Absoluter Pfad zu einem Ordner für temporäre Freigaben und Download-Links. Diese Einstellung existiert aus Kompatibilitätsgründen und wird für neue Links nicht mehr verwendet.",
"Download URL" => "Download-URL",
"If not inferred directly from the current pydio URL plus the public base URI, replace the public access URL here." => "Tragen Sie hier die URL für öffentliche Links ein, falls diese nicht 'Server-URL' + 'Base-URI' ist.",
"Existing users" => "Bestehende Benutzer",
"Allow the users to pick an existing user when sharing a folder" => "Erlaubt den Benutzern bei der Freigabe von Ordnern einen anderen Benutzer auszuwählen",
"Compression Features" => "Komprimierungsfunktionen",
"Gzip Download" => "Gzip-Komprimierung",
"Gzip files on-the-fly before downloading. Disabled by default, as it's generally useful only on small files, and decreases performances on big files. This has nothing to see with the Zip Creation feature, it's just a on-the-fly compression applied on a unique file at download." => "Dateien vor dem Herunterladen mit Gzip komprimieren. Standardmäßig deaktiviert, da die Performance zwar bei kleinen Dateien besser, dafür aber bei großen Dateien schlechter wird. Steht nicht im Zugammenhang mit der Zip-Komprimierung beim Herunterladen mehrerer Dateien sondern gilt nur für einzelne Dateien.",
"Gzip Limit" => "Gzip-Komprimierung bis Dateigröße",
"If activated, a default limit should be set above when files are no more compressed." => "Dateien die größer sind werden nicht mehr komprimiert. Einschränkung sollte für gute Geschwindigkeit verwendet werden.",
"Zip Creation" => "Erstellung von Zip-Dateien",
"If you encounter problems with online zip creation or multiple files downloading, you can disable the feature." => "Deaktivieren, wenn es Probleme beim Online-Erstellen von ZIP-Dateien oder dem Download mehrerer Dateien gibt.",
"WebDAV Server" => "WebDAV-Server",
"Enable WebDAV" => "WebDAV aktivieren",
"Enable the webDAV support. Please READ THE DOC to safely use this feature." => "WebDAV-Unterstützung aktivieren. Bitte lesen Sie die Dokumentation, bevor diese Funktion aktiviert wird.",
"Shares URI" => "Freigabe-URI",
"Common URI to access the shares. Please READ THE DOC to safely use this feature." => "URI für den Zugriff auf Freigaben. Bitte lesen Sie die Dokumentation, bevor diese Funktion aktiviert wird.",
"Shares Host" => "Freigabe-Host",
"Host used in webDAV protocol. Should be detected by default. Please READ THE DOC to safely use this feature." => "Host für WebDAV. Sollte automatisch erkannt werden. Bitte lesen Sie die Dokumentation, bevor diese Funktion aktiviert wird.",
"Digest Realm" => "Authentifizierungs-Realm",
"Default realm for authentication. Please READ THE DOC to safely use this feature." => "Standard  Authentifizierungs-Realm. Bitte lesen Sie die Dokumentation, bevor diese Funktion aktiviert wird.",
"Miscellaneous" => "Verschiedenes",
"Command-line Active" => "Kommandozeile aktiv",
"Use Pydio framework via the command line, allowing CRONTAB jobs or background actions." => "Pydio kann über die Kommandozeile aufgerufen werden. (z.B. für CRONTAB oder Hintergrund-Aktionen)",
"Command-line PHP" => "Pfad zur PHP-Kommandozeile",
"On specific hosts, you may have to use a specific path to access the php command line" => "Wenn PHP nicht über die Umgebungsvariablen gefunden wird muss hier der Pfad angegeben werden.",
"Filename length" => "Dateinamen länge",
"Maximum characters length of new files or folders" => "Anzahl der Zeichen für neue Ordner und Dateien",
"Temporary Folder" => "Ordner für temporäre Daten",
"This is necessary only if you have errors concerning the tmp dir access or writeability : most probably, they are due to PHP SAFE MODE (should disappear in php6) or various OPEN_BASEDIR restrictions. In that case, create and set writeable a tmp folder somewhere at the root of your hosting (but above the web/ or www/ or http/ if possible!!) and enter here the full path to this folder" => "Nur nötig, wenn es Problem beim (Schreib-)zugriff auf den Tmp-Ordner gibt. Meistens verursacht durch den PHP SAFE MODE (in php6 nicht mehr vorhanden) oder durch verschiedene OPEN_BASEDIR-Einschränkungen. In diesem Fall kann ein eigener tmp-Ordner erstellt (wenn möglich außerhalb von web/, www/ oder http/) und hier eingetragen werden.",
"Admin email" => "Administrator E-Mail-Adresse",
"Administrator email, not used for the moment" => "Administrator E-Mail-Adresse",
"User Credentials" => "Anmeldeinformationen",
"User" => "Benutzer",
"User name - Can be overriden on a per-user basis (see users 'Personal Data' tab)" => "Benutzername, der pro Benutzer überschrieben werden kann. (siehe Tab 'Benutzerdaten')",
"Password" => "Passwort",
"User password - Can be overriden on a per-user basis." => "Passwort, das pro Benutzer überschrieben werden kann.",
"Session credentials" => "Anmeldeinformationen aus Sitzung",
"Try to use the current Pydio user credentials for connecting. Warning, the AJXP_SESSION_SET_CREDENTIALS config must be set to true!" => "Verwendet die Pydio Anmeldeinformationen des Benutzers. Achtung, dafür muss die Einstellung AJXP_SESSION_SET_CREDENTIALS aktiviert sein.",
"User name" => "Benutzername",
"User password" => "Benutzer Passwort",
"Repository Slug" => "Repository Slug",
"Alias" => "Alias",
"Alias for replacing the generated unique id of the repository" => "Alias, der statt der automatisch generierten Id dieser Arbeitsumgebung angezeigt wird.",
"Template Options" => "Vorlagen-Einstellungen",
"Allow to user" => "Dem Benutzer erlauben",
"Allow non-admin users to create a repository from this template." => "Benutzer, die über keine Administratorrechte verfügen, dürfen anhand dieser Vorlage eine Arbeitsumgebung erstellen.",
"Default Label" => "Standard-Beschreibung",
"Prefilled label for the new repository, you can use the AJXP_USER keyworkd in it." => "Standard-Beschreibung der Arbeitsumgebung (Es ist möglich, den Platzhalter 'AJXP_USER' zu verwenden)",
"Small Icon" => "Kleines Symbol",
"16X16 Icon for representing the template" => "16X16 Pixel großes Symbol der Arbeitsumgebung",
"Big Icon" => "Großes Symbol",
"Big Icon for representing the template" => "Großes Symbol der Arbeitsumgebung",
"Filesystem Commons" => "Dateisystem Allgemein",
"Recycle Bin Folder" => "Papierkorb-Ordner",
"Leave empty if you do not want to use a recycle bin." => "Leer lassen, um keinen Papierkorb zu verwenden.",
"Default Rights" => "Standardrechte",
"This right pattern (empty, r, or rw) will be applied at user creation for this repository." => "Rechte die auf Benutzer angewendet werden, wenn Sie für diesen Arbeitsbereich erstellt werden. (leer, r, oder rw)",
"Character Encoding" => "Zeichenkodierung",
"If your server does not set correctly its charset, it can be good to specify it here manually." => "Wenn der Zeichensatz vom Server nicht korrekt erkannt wurde kann er hier manuell gesetzt werden.",
"Pagination Threshold" => "Seitenumbruch ab",
"When a folder will contain more items than this number, display will switch to pagination mode, for better performances." => "Ordner mehrseitig anzeigen, wenn die angegebene Anzahl an Einträgen überschritten ist, um die Geschwindigkeit zu verbessern.",
"#Items per page" => "Einträge pro Seite",
"Once in pagination mode, number of items to display per page." => "Wenn der Ordner mehrseitig angezeigt wird kann hier angegeben werden, wie viele Elemente sich auf einer Seite befinden.",
"Default Metasources" => "Standard-Quellen für Metadaten",
"Comma separated list of metastore and meta plugins, that will be automatically applied to all repositories created with this driver" => "Kommagetrennte Liste mit Metadaten- und Metadatenspeicher-Erweiterungen, die automatisch beim Erstellen einer neuen Arbeitsumgebung hinzugefügt werden, wenn dieser Treiber verwendet wird.",
"Auth Driver Commons" => "Auth. Treiber Allgemein",
"Transmit Clear Pass" => "Passwort im Klartext übertragen",
"Whether the password will be transmitted clear or encoded between the client and the server" => "Legt fest, ob das Passwort im Klartext an den Server übertragen oder vorher verschlüsselt wird.",
"Auto Create User" => "Benutzer-Objekt automatisch erstellen",
"When set to true, the user object is created automatically if the authentication succeed. Used by remote authentication systems." => "Bei dem Wert Ja wird das Benutzer-Objekt automatisch erstellt, sobald der Benutzer erfolgreich angemeldet ist. Wird bei Remote-Authentifizierung verwendet.",
"Login Redirect" => "Weiterleitung für Anmeldung",
"If set to a given URL, the login action will not trigger the display of login screen but redirect to this URL." => "Wenn eine URl eingetragen ist wird dem Benutzer nicht die Anmelde-Seite von Pydio sondern die konfigurierte Seite angezeigt.",
"Admin Login" => "Anmeldung als Administrator",
"For exotic auth drivers, an user ID that must be considered as admin by default." => "Für exotische Authentifizierungs-Treiber muss standardmäßig ein Benutzer konfiguriert werden, der Administrator ist.",
"Show hidden files" => "Versteckte Dateien anzeigen",
"Show files beginning with a ." => "Dateien, die mit einem '.' beginnen anzeigen.",
"Hide recycle bin" => "Papierkorb verstecken",
"Whether to show the recycle bin folder. Unlike in the following options, the folder will be hidden but still writeable." => "Soll ein Papierkorb angezeigt werden. Auch wenn der Papierkorb nicht angezeigt wird ist der Ordner trotzdem beschreibbar.",
"Hide extensions" => "Datei-Erweiterungen verstecken",
"Comma-separated list of extensions to hide. Extensions, files and folders that are hidden are also access forbidden." => "Kommagetrennte Liste mit Datei-Erweiterungen, die versteckt werden. Der Zugriff auf versteckte Dateien wird ebenfalls verboten.",
"Hide folders" => "Ordner verstecken",
"Comma-separated list of specific folders to hide" => "Kommagetrennte Liste mit Ordnern, die versteckt werden.",
"Hide files" => "Dateien verstecken",
"Comma-separated list of specific files to hide" => "Kommagetrennte Liste mit Dateien, die versteckt werden. Der Zugriff auf versteckte Dateien wird ebenfalls verboten.",
"Metadata and indexation" => "Metadaten und Indexierung",
"Pydio Main Options" => "Allgemein",
"Server URL" => "Server-URL",
"Server URL used to build share links and notifications. It will be detected if empty." => "Wird für Freigabe-Links und Benachrichtigungen verwendet. Wert wird automatisch ermittelt, wenn leer.",
"Force Basic Auth" => "Standard-Authentifizierung erzwingen",
"This authentication mechanism is less secure, but will avoid the users having to re-enter a password in some case." => "Bietet weniger Sicherheit und die Benutzer müssen in manchen Fällen das Passwort nicht erneut eingeben.",
"Browser Access" => "Zugriff über den Browser",
"Display the list of files and folder when accessing through the browser" => "Die Dateiliste kann über den Browser abgerufen werden.",
"Command Line" => "Kommandozeile",
"Use COM class" => " COM-Klasse benutzen",
"On Windows running IIS, set this option to true if the COM extension is loaded, this may enable the use of the php command line." => "Auf Windows-Servern mit IIS setzen, wenn die COM-Erweiterung geladen ist. Damit ist es möglich, die PHP-Kommandozeile zu nutzen.",
"Disable Zip browsing" => "Direktes Öffnen von ZIP-Dateien deaktivieren",
"Disable Zip files inline browsing. This can be necessary if you always store huge zip archives: it can have some impact on performance." => "Direktes Öffnen von ZIP-Dateien deaktivieren. Dies kann nötig sein, wenn mit großen ZIP-Dateien gearbeitet wird, da dies Auswirkungen auf die Geschwindigkeit des Systems hat.",
"Zip Encoding" => "Zip-Encoding",
"Set up a specific encoding (try IBM850 or CP437) for filenames to fix characters problems during Zip creation. This may create OS-incompatible archives (Win/Mac)." => "Bestimmtes Encoding für Dateinamen verwenden um Probleme beim Erstellen der Zip-Dateien zu vermeiden. (z.B. IBM850 oder CP437) Es ist möglich, inkompatible Archive zu erstellen (Win/Mac). If you still have issue, you can add //TRANSLIT after the encoding string to force transliteration of unknown characters in your target encoding (example CP437//TRANSLIT).",
"Repository Commons" => "Arbeitsumgebung Allgemein",
"Description" => "Beschreibung",
"A user-defined description of the content of this workspace" => "Benutzerdefinierte Beschreibung des Inhalts dieser Arbeitsumgebung",
"Group Path" => "Gruppe",
"Set this repository group owner : only users of this group will see it" => "Gruppe, der diese Arbeitsumgebung gehört. Nur Benutzer dieser Gruppe können die Arbeitsumgebung sehen.",
"Disable WebDAV" => "WebDAV deaktivieren",
"Explicitly disable WebDAV access for this repository." => "WebDAV-Zugriff für diese Arbeitsumgebung gezielt deaktivieren.",
"Allow to group admins" => "Den Gruppen-Admins erlauben",
"Allow group administrators to create a repository from this template." => "Gruppen-Administratoren dürfen anhand dieser Vorlage Arbeitsumgebungen erstellen.",
"Skip auto-update admin rights" => "Automatische Aktualisierung der Admin-Berechtigungen",
"If you have tons of workspaces (which is not recommanded), admin users login can take a long time while updating admin access to all repositories. Use this option to disable this step, admin will always have access to the Settings." => "Wenn Sie sehr viele Arbeitsbereiche haben (was nicht empfohlen ist), kann die Anmeldung als Administrator sehr lange dauern, da die Rechte aller Arbeitsumgebungen aktualisiert werden. Diese Einstellung deaktiviert die Aktualisierung. Der Administrator hat aber immer Zugriff auf die Einstellungen.",
"Auto apply role" => "Rolle automatisch zuweisen",
"For multiple authentication, apply this role to users authenticated via this driver" => "Für mehrfache Authentifizierung diese Rolle zu Benutzern hinzufügen wenn sie über diesen Treiber authentifiziert werden.",
"DSN" => "Name der Datenquelle",
"Data Source Name" => "Name der Datenquelle",
"Host" => "Server",
"Database server" => "Der Datenbank-Server",
"Database" => "Datenbank",
"Database name" => "Name der Datenbank",
"File" => "Datei",
"Database file" => "Datenbank-Datei",
"Remote Sorting" => "Remote-Sortierung",
"Force remote sorting when in paginated mode. Warning, this can impact the performances." => "Erzwinge Remote-Sortierung, falls mehrseitig. Warnung: Dies kann negative Auswirkungen auf die Geschwindigkeit haben.",
"Remote Sorting Default Field" => "Standard-Spalte für Remote-Sortierung",
"Default field to sort on" => "Standard-Spalte nach der sortiert wird",
"Remote Sorting Default Direction" => "Standard-Richtung für Remote-Sortierung",
"Default sorting direction" => "Standard-Reihenfolge in der die Daten angezeigt werden",
"Driver" => "Treiber",
"Driver type (do not touch)" => "Art der Datenbankverbindung",
"Use PHP MySQLi extension" => "Die Erweiterung PHP MySQLi verwenden",
"Use MySQLi" => "MySQLi verwenden",
"Ascending" => "Aufsteigend",
"Descending" => "Absteigend",
"Name" => "Name",
"Modification date" => "Änderungsdatum",
"File size" => "Größe",
"File Type" => "Dateityp",
"Read Only" => "Nur Lesen",
"Read and Write" => "Lesen und Schreiben",
"Write Only (upload)" => "Nur Schreiben (hochladen)",
"OAuth Commons" => "OAuth-Authentifizierung",
"Client ID" => "Client-ID",
"Client SECRET" => "Client-SECRET",
"Scope" => "Zugriffsart",
"Auth URL" => "Authentifizierungs-URL",
"Token URL" => "Token-URL",
"Redirect URL" => "Weiterleitungs-URL",
"API endpoint - Used to launch the window allowing the user to authenticate and accept the terms of the app" => "API-Endpunkt - Ermöglicht den Benutzern die Anmeldung und das Akzeptieren der Nutzungsbedingungen der Anwendung",
"API endpoint - Used to refresh or validate the token retrieved in the authentication part" => "API-Endpunkt - Wird zur Authentifizierung verwendet, um den Token zu erneuern oder zu überprüfen",
"API setting - Redirect URL for the OAuth Application" => "API-Einstellung - Weiterleitungs-URL für die OAuth-Anwendung",
"Public Base URI" => "Base-URI für öffentliche Links",
"URI where to serve the public links" => "Base-URI für öffentliche Links",
"Enable for all users" => "Für alle Benutzer aktivieren",
"Enable WebDAV for all users by default. If set to false, users will have to manually enable WebDAV via their preferences panel." => "WebDAV standardmäßig für alle Benutzer aktivieren. Mit dem Wert 'Nein' müssen Benutzer WebDAV in ihren Einstellungen manuell aktivieren.",
"Download Delegation" => "Download-Delegation",
"Delegates download operations to an alternative agent, either webserver or pydio agent. Warning, this requires external modules to be installed. When using XSendFile/XaccelRedirect, you have to manually add the folders where files will be downloaded in the module configuration" => "Delegiert Download-Operationen an einen alternativen Agent (Webserver oder Pydio-Agent). Achtung, dies erfordert ein externes Modul. Mit 'XSendFile/XaccelRedirect' müssen die Download-Ordner manuell in der Modul-Konfiguration hinterlegt werden.",
"Core Connexion" => "Core-Verbindung",
);
