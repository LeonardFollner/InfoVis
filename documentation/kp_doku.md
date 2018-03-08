# Motivation

Die grundlegende Motivation dieser Anwendung ist es, die Bedeutung des Einflusses der arabischen Sprache und Kultur auf unsere europäischen Sprachen und Kulturen zu vermitteln, und ihren Präsenz im Alltag zu unterstreichen. Dabei fügt sie sich in den Rahmen der Kooperation des Komplexpraktikums mit der Austellung des Damaskuszimmers der SKD ein.

# Aufgabenstellung
Das Projekt beschäftigt sich mit dem Damaskuszimmer im Japanischen Palais Dresden. Das Zimmer befindet sich dort losgelöst von seinem ursprünglichen Standort als Teil einer entstehenden Ausstellung. Die Restauratorin Anke Scharrahs bedauert dabei den Verlust des Kontextes, in dem sich dieses Zimmer eins befand. Das bezieht sich nicht nur auf den räumlichen Bezug, sondern auch auf die Geschichte, die Nutzung und die kulturelle Bedeutung des Zimmers. Das Projektes dient dementsprechend dazu dem Besucher der Ausstellung einen Sinn für diesen Kontext zu verschaffen.

Aufgabe des Projektes ist es jedem Besucher diesen Kontext in einer für ihn geeigneten Form leicht zugänglich zu machen. Dabei muss auf die verschiedenen Bedürfnisse der Benutzer, wie deren Zeit, Lernstil und Hingabe, eingegangen werden. Außerdem muss der museale Kontext Beachtung finden. Nutzer dürfen nicht durch die vornagegangene Nutzung der Anwendung durch andere Besucher beeinflusst werden. 

Das vorliegende Projekt versucht diesen Kontext konkret durch das Aufzeigen des Einflusses der arbabischen Kultur auf die europäische Sprache herzustellen.

# Zielstellung

###Ziele

Die Ziele unsere Anwendung sind es, die Anwendung für möglichst alle Besucher der Ausstellung zugänglich zu machen, das heißt, sie sollte nicht zu komplex sein, leicht verständlich, aber auch tiefer führende Informationen für interessiertere Besucher bieten. Selbstverständlich soll sie für den Besucher relevante Informationen liefer, dabei interessant gestaltet sein und einen intuitiven Einblick verschaffen. Eine sehr wichtige Eigenschaft ist auch die Zustandslosigkeit. Sie ermöglicht es, das Besucher nicht in einem begonnen "Spiel" eines vorherigen Nutzers landen, und dann nicht wissen, was geschieht - die Anwendung soll also immer bereit für einen neuen Besucher sein.

###Ergebnisse

Im aktuellen Stand existiert eine funktionale, aber inhaltlich nicht ausgeschmückte Anwendung. Das vorhandene Konzept ist nicht vollkommen auf diese Anwendung abgebildet, es fehlen noch eine funktionale Darstellung der geographischen Wanderung von Begriffen und auch das Styling ist noch nicht komplett abgeschlossen. Die Zustandslosigkeit ist jedoch gelungen. Außerdem sollte man beachten, dass die Anwendung sich kontextuell im Rahmen der Ausstellung eingliedert. Sie hat keinen direkten inhaltlichen Bezug auf das Damaskuszimmer, eignet sich aber trotzdem gut für den Einstieg in die Ausstellung, oder um von zu Hause aus nochmal über das Thema zu reflektieren.

####Teilschritte

Am Anfang stand die Auseinandersetzung mit dem Damaskuszimmers, welches wir besuchten und uns von Anke Scharrahs, der leitenden Restauratorin präsentiert wurde. Dort sammelten wir Inspirationen, erhielten Einblicke in den Restaurationsprozess, die Geschichte des Zimmers und allgemein zur Kultur. Dabei zeigte uns Scharrahs eine Tafelm auf der 25 Begriffe waren, und fragte, welche aus dem arabischen Raum stammten und ließ die Gruppe Schätzungen abgeben. Nur wenige kamen an den tatsächlichen hohen Wert heran. Später griffen wir dieses Thema wieder auf. Nach dem Besuch des Zimmers sammelten und bündelten wir unsere Eindrücke, und unterteilten sie in unterschiedliche Themenbereiche und bildeten Gruppen zu diesen. Dabei legten wir anfangs noch unseren Fokus auf die Kalligrafie im Zimmer und weniger auf Arabismen. Die Auswertung eines über die vergangengen Semesterferien geführter Fragebogen gab uns Einblicke in die Besucher und deren Erwartungshaltung und Anforderung gegenüber einer mulitmedialen Ausstellung. Um eine für den Nutzer nicht nachvollziehbare Unterteilung der Anwendung in zwei doch so unterschiedliche Themen zu vermeiden, legte sich der Fokus dann komplett auf die Arabismen. Es folgten diverse neue Fragestellungen: Wie stellt man die Trennung zwischen Orient und Okzident dar? Wie kann man die Häufigkeit & Bedeutung der Arabismen demonstrieren? Wie ihre Geschichte präsentieren? Wie überkommen wir das Problem der Zustandslosigkeit? Nach der Auseinandersetzung mit diesen Themen lag die Entwicklung eines Prototypen nahe. Dieser wurde mit React, einem Javascript Framework realisiert. Anhand des Prototypen wurden diverse Konzepte dann ausprobiert, verworfen oder verfeinert, wie z.B. das Teaser-Konzept: anfangs wenig Information oder Text, sondern Grafiken. Wecken diese das Interesse des Nutzers, kann dieser sich in den inhalten vertiefen, um mehr zu erfahren.

Um die Anwendung tatsächlich zu erleben, muss sie noch mit mehr echten Daten gefüllt werden, da sie im Moment nur zwei beispielhaft eingepflegte Begriffe enthält. Des weiteren muss die Ansicht des geographischen Wandels noch ausgearbeitet werden, für welchen es aktuell noch kein befriedigendes Konzept gibt. Außerdem sollte sie natürlich mit echten Nutzern getestet und evaluiert werden, um Probleme identifizieren und beheben zu können. 

# Einleitung 

## Anwendungsfall

Der Kontext der Anwendung ist der Kontext des Zimmers - sie liefert keine konkreten Informationen zum Ausstellungsstück, sondern zu dessen kulturellen Hintergrund. Sie eigent sich dabei gut als einleitendes Element, fördert das Verständnis und Bewusstsein zu der Thematik und lässt den Besucher auch noch von zu Hause oder unterwegs sich mit dem Thema auseinandersetzen. 

Dabei wird der Einfluss des Orients auf den Okzident durch den kulturellen Austausch über Jahrhunderte auch in sprachlicher Form vermittelt, die sprachliche und inhaltliche Wandlung beschrieben und dargestellt.

Neben dem Hauptthema wurden auch Sprachgeschichte für die Inhalte und Webentwicklung für den Prototypen betrachtet.

## Verwandte Arbeiten

Neben dem kleinen, aber sehr schön ausgearbeiteten Werk "Von Algebra bis Zucker" **QUELLEN?** gab es keine ähnlichen Werke oder Projekte, die herangezogen wurden.

# Hauptteil

## Methodisches Vorgehen

Beim Entwurfsprozess wurde auf diverse Methoden zurückgegriffen. Am grundlegendsten war dabei das Affinitätsdiagramm, es half enorm dabei, den Umfang des Themas zu erkennen, Bereiche zu schaffen, und Inhalte zu ordnen und zu priorisieren. 
Für die Usability wurden Personas erstellt, sie vermittelten dabei, dass durchaus unterschiedliche Nutzer die Anwendung nutzen möchten, etwa weniger technisch affine, dafür aber interessierter an ausführlichen Inhalten, im Vergleich zu medial erfahrenen Nutzern, die aber eher hastig den Kern der Anwendung erfassen wollen und dann weiter ziehen. So konnte ein Kompromiss zwischen Komplexität und inhaltlichem Umfang ausgearbeitet werden.
Szenarios halfen dabei, andere Probleme zu entdecken, hier konkret die Zustandslosigkeit: Nutzer sollen die Anwendung zu jedem Zeitpunkt "betreten" und "verlassen" können, ohne auf Artefakte von vorherigen Nutzern zu stoßen oder selber welche zu hinterlassen.
Mit Skizzen, Screens und Mockups konnten schnell und einfach verschiedene Konzepte ausgearbeitet und verglichen werden, wie zum Beispiel die Karten- und die Spaltenansicht. 
Um zu erfassen, welche Informationen überhaupt dargestellt werden sollen, half die Recherche. Hier stellte sich die Differenzierung zwischen geographischem und inhaltlichem Wandel als wichtiger Faktor heraus. Leider gab es jedoch wenig Literatur, die hier zur Hilfe gezogen werden konnten.

## Konzeption

Bei der Konzeption gab es folgende Themen: Das Interface generell. Hier wurde ohne viele andere Möglichkeiten zu betrachten eine einfache Unterteilung des Screens in Karte und Sidebar am rechten Bildrande ausgewählt, da dieses unkompliziert ist und eine gute Metapher von Quelle (die Arabismen befinden sich in der Sidebar) und Ziel (sie sollen auf die Karte gezogen werden) darstellt.
Für die Trennung von Orient und Okzident bot sich eine Karte an - die wohl naheliegendste Methode, um eine geographische Einordnung zu ermöglichen. Um die Regionen zu unterscheiden, werden sie mit zwei unterschiedlichen Tönen eingefärbt.
Eine umstrittene Frage war das Verdeutlichen der Gewichtung der Arabismen. Hierbei wurden zwei Konzepte betrachtet, die visuelle und die mentale Distinktion: bei der visuellen befinden sich viele Arabismen auf der Karte und der Nutzer erfasst dies auf Anhieb, während bei der mentalen nur wenige, insgesamt maximal fünf Begriffe auf der Karte liegen, und der Nutzer selber durch aktives Einordnen die Erkenntnis erlangen soll.
Bei der Detailansicht für die inhaltliche Wandlung wurden die meisten Konzepte betrachtet. Mit dem Stichwort "Collage" wurden Ansichten wie eine Comicbook Seite oder eines Fotoalbums betrachtet, aber zu Gunsten von Spalten verworfen, da diese am besten dynamisch gestaltbar sind: Sollen mehr, detailliertere Inhalte angezeigt werden, kann die ausgewählte Spalte breiter werden und die anderen verdrängen. 


## Entwurf

**Screnshots?? leonardfollner.de/infovis**

# Fazit

Abschließend lässt sich sagen, dass das Ergebnis der ursprünglichen Aufgabe gerecht wird. Zwar ist sie nicht vollständig und lässt Fragen, die sich während des Entwicklungsprozesses gestellt haben, noch unbeantwortet, aber die ausgänglichen Anforderungen werden erfüllt. Auch hat sich der Wandel von Kalligrafie und Arabismen zu nur Arabismen sich positiv bemerkmar gemacht. Er führte zu einer kompakteren und inhaltich konzentrierten Anwendung, welche nicht viel, aber das gut umsetzt.


# Ausblick

Wie schon häufig erwähnt, ist die Anwendung nicht fertig - die größte Baustelle ist hier wohl die Detailansicht für den geographischen Wandel von Begriffen, hier muss noch ein gutes Konzept erarbeitet und implementiert werden. Zusätzlich stellt sich die Frage, ob die Anwendung in ihrer kontextuellen Niche bleiben soll, oder noch anders einen Bezug zum Damaskuszimmer hergestellt werden kann. Auch lässt sich noch diskutieren, ob man die Inhalte noch aus anderen Winkeln neben der geographischen und inhaltlichen Wandlung betrachten kann. 
