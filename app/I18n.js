import { getValue } from './helpers/functions';

// button message start with button_
// quick replies start with quick_reply_
// controller dependens messages start with the controller ctlr_name
// global valid messages start with message_
// gloabl valid

const phrases = {
  "de": {
    "message_words": {
      "and": "und"
    },
    "button_repeat": "Wiederholen",
    "message_enabled": "Aktiviert",
    "message_disabled": "Deaktiviert",
    "message_back_to_bot": "Falls du deine Einstellungen korrekt sind, kannst du diese Option wählen:",
    "button_back_to_bot": "Zurück zum bot",
    "button_enable": "Aktivieren",
    "button_disable": "Deaktivieren",
    "button_talk_to_human": "Support kontaktieren",
    "message_greeting_text": 'Schön, dass du den ok.- Chatbot ausprobieren willst!\n\nFalls du Schwierigkeiten mit der Bedienung hast, kannst du jederzeit "Hilfe" schreiben, um die Anleitung aufzurufen.',
    "message_error": "Oops, irgendwas ist schief gelaufen.",
    "message_error_2": "Hmm, irgendwas ist schief gelaufen.",
    "message_no_deals_available": "Leider habe ich aktuell keine Angebote für dich gefunden. Frag mich später nochmals.",
    "message_available_deals": "Ich habe ein paar Deals zusammengestellt, die dir gefallen könnten.",
    "message_no_problem": "Bitte 😊",
    "message_sorry": "Sorry 😰",
    "message_smile": "😁",
    "message_bye": "Tschüss! Bis zum nächsten Mal 😋",
    "message_how_are_you": "Sehr gut 🙂 Viele tolle ok.- deals erwarten dich!",
    "ctlr_help": "Durch mich kannst du von aktuellen Ok.- deals profitieren!\n\nDurchstöbere unsere Deals, speichere deine Lieblingsdeals ab und löse Deals in unseren Verkaufsstellen ein!",
    "ctrl_delete_deal": {
      "no_saved_deals": "Du hast keine Deals gespeichert.",
      "confirm_deal_deletion": "In Ordnung, Deal wurde gelöscht.",
      "not_saved_deal": "Du hast diesen Deal nicht gespeichert.",
      "save_new_deals": "Falls du neue Deals hinzufügen möchtest, hier sind unsere Kategorien:",
      "no_longer_valid": "Deal ist nicht mehr gültig."
    },
    "ctrl_unknown": {
      "sorry": "Sorry {firstName}, leider habe ich darauf noch keine Antwort. Versuchs nochmals oder nutze eine der untenstehenden Optionen.",
    },
    "ctrl_next_location": {
      "text": "Finde den nächsten Shop in deiner Nähe.",
      "title": "Standortsuche",
    },
    "crtrl_welcome_message": {
      "hello": 'Hoi {firstName}!\n\nIch bin der Chatbot von ok.-. Durch mich kannst du von aktuellen ok.- deals profitieren. Als Willkommensgruss habe ich einen speziellen Deal für dich bereit.\n\nFalls du mehr darüber erfahren willst, wie du mit mir interagieren kannst, drück einfach auf "Anleitung".',
    },
    "ctrl_save_deal": {
      "confirm_save_deal": "In Ordnung, Deal wurde gespeichert.",
      "save_more_deals": "Falls du noch weitere Deals hinzufügen möchtest, hier sind unsere Kategorien:",
      "already_saved": "Du hast diesen Deal bereits gespeichert.",
      "no_longer_valid": "Deal ist nicht mehr gültig."
    },
    "ctrl_show_my_deals": {
      "deal_not_saved": "Du hast noch keinen Deal gespeichert.",
      "your_saved_deals": "Okay, hier sind deine Deals.",
      "no_deals_saved": "Du hast aktuell keine Deals gespeichert.",
      "add_deals": "Wähle eine unserer Kategorien um neue Deals hinzuzufügen:"
    },
    "ctlr_hello": "Hoi {firstName}!\n\nWie kann ich dir heute helfen?",
    "ctlr_notifications": {
      "saved_deals_expire": "Hallo {firstName}, wir möchten dir mitteilen, dass {dealsCount} deiner gespeicherten Deals bald ablaufen.",
      "saved_deals_profit": "Kurz vor Schluss noch profitieren, ok für mich.",
      "manage_notifications": "Falls du keine Benachrichtigungen erhalten möchtest, kannst du diese hier verwalten:",
      "menu_introduction": "Hier kannst du deine Benachrichtigungen verwalten. Wähle einen Benachrichtigungstyp aus um ihn zu deaktivieren/aktivieren:",
      "mutation_saved": "Deine Einstellungen wurden gespeichert.",
      "saved_deals_expire_title": "Ablaufende Gespeicherte Deals",
      "new_deals_title": "Neu Verfügbare Deals",
      "mutate_status": "{title}: {status}",
      "new_deals": "Hallo {firstName}, folgende Deals wurden neu hinzugefügt:"
    },
    "ctrl_human": {
        "info": "Falls ich nicht weiterhelfen kann, hast du hier die Möglichkeit, mit einem Menschen Kontakt aufzunehmen.",
        "ask": "Wie lautet deine Nachricht?",
        "confirmation": "In Ordnung. Es wird sich jemand mit dir in Verbindung setzen. Dies kann eine Weile dauern.",
        "subject": "Ein Chatbot Benutzer hat Kontakt aufgenommen",
        "text": "Beep, boob! Ein Bot-Benutzer möchte mit einem Menschen sprechen.<br><br>Link zur Page: {link}<br>User: {firstName} {lastName}<br>Nachricht: {message}<br><br>Over<br>ok.- Chatbot",
        "triggered": "Da bist du ja wieder!"
    },
    "button_welcome_deal": "Welcome Deal",
    "button_show_deals": "Aktuelle Deals",
    "button_show_my_deals": "Meine Deals anzeigen",
    "button_instructions": "Anleitung",
    "button_save_deal": "Deal speichern",
    "button_redeem_deal": "Deal einlösen",
    "button_delete_deal": "Deal löschen",
    "button_help": "Hilfe",
    "button_nofifications": "Benachrichtigungen",
    "quick_reply_checkout_deals": "Teste doch gleich ein paar Deals aus unseren Kategorien:",
    "quick_reply_more_deals_from_categories": "Weitere Deals aus unseren Kategorien:",
    "quick_reply_chose_category": "Aus welcher Kategorie?",
    "ctrl_instruction": {
      "line_1": "Also {firstName}, mit mir kannst du alle aktuellen ok.- deals durchstöbern, deine Lieblings-Deals speichern und in unseren Verkaufsstellen einlösen (Strichcode an der Kasse zeigen).",
      "line_2": 'Als Chatbot verstehe ich ganz gewöhnliche Texteingaben und lerne laufend hinzu.\nWenn du z.B. die aktuellen Deals anzeigen willst, schreibe einfach "Deals anzeigen" oder "Zeige mir die aktuellen Deals.',
      "line_3": 'Weitere Befehle könnten wie folgt aussehen: "Zeige mir alle Energy Drinks" oder "Food Deals" um eine spezielle Deal-Kategorie anzuzeigen.\nDeine gespeicherten Deals erreichst du z.B. mit "Meine Deals" oder "Gespeicherte Deals".',
    },
    "ctrl_pokemon": {
        "find_another": "Möchtest du ein weiteres Pokemon fangen?",
        "already_catched": "Es ist ein {pokeName}, du hast dieses Pokemon bereits gefangen.",
        "amount_catched": "Du hast bereits {pokeSum} von {pokeMax} Pokemon gefangen.",
        "all_catched": "Wow! Du hast alle 151 Pokemon gefangen.",
        "catched": [
            "Ich habe dir das Pokemon {pokeName} gefangen.",
            "Du hast ein {pokeName} erhalten.",
            "Ok, ich habe ein {pokeName} gefangen.",
            "Wie gefällt dir das Pokemon {pokeName}?"
        ]
    },
    "ctrl_redeem_deal": {
      "show_barcode": "Zeige diesen Strichcode an der Kasse von {pointOfSale} in der Schweiz.",
      "no_longer_valid": "Deal ist nicht mehr gültig."
    },
    "text_expires_at" : "Gültig bis:"
  },
  "en": {},
};

export default (key) => {
  return getValue(phrases.de, key);
};
