import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Types "../types/gita";

module {

  // ── Tuple compare for (Nat, Nat) keys ────────────────────────────────────────

  func natPairCompare(a : (Nat, Nat), b : (Nat, Nat)) : { #less; #equal; #greater } {
    let cmpChapter = Nat.compare(a.0, b.0);
    switch cmpChapter {
      case (#equal) { Nat.compare(a.1, b.1) };
      case other { other };
    };
  };

  // ── Sloka helpers ─────────────────────────────────────────────────────────────

  /// Returns all slokas stored in the map as an array.
  public func getAllSlokas(slokas : Map.Map<(Nat, Nat), Types.Sloka>) : [Types.Sloka] {
    slokas.values().toArray();
  };

  /// Retrieves a single sloka by chapter and sloka number.
  public func getSloka(
    slokas : Map.Map<(Nat, Nat), Types.Sloka>,
    chapterNumber : Nat,
    slokaNumber : Nat,
  ) : ?Types.Sloka {
    slokas.get(natPairCompare, (chapterNumber, slokaNumber));
  };

  /// Returns all slokas for a given chapter.
  public func getSlokasByChapter(
    slokas : Map.Map<(Nat, Nat), Types.Sloka>,
    chapterNumber : Nat,
  ) : [Types.Sloka] {
    let filtered = slokas.entries().filter(func((key, _v)) { key.0 == chapterNumber });
    filtered.map(func((_k, v)) { v }).toArray();
  };

  /// Full-text search across Sanskrit text, transliteration, and meanings.
  public func searchSlokas(
    slokas : Map.Map<(Nat, Nat), Types.Sloka>,
    keyword : Text,
    paging : Types.PageRequest,
  ) : Types.PagedResult<Types.Sloka> {
    let lower = keyword.toLower();
    let allMatches : [Types.Sloka] = slokas.values().filter(func(s : Types.Sloka) : Bool {
        s.sanskritText.toLower().contains(#text lower) or
        s.transliteration.toLower().contains(#text lower) or
        s.meanings.english.toLower().contains(#text lower) or
        s.meanings.hindi.toLower().contains(#text lower) or
        s.meanings.telugu.toLower().contains(#text lower) or
        s.meanings.sanskrit.toLower().contains(#text lower) or
        s.explanation.toLower().contains(#text lower)
      }).toArray();
    let totalCount = allMatches.size();
    let start = paging.page * paging.pageSize;
    let end_ = Nat.min(start + paging.pageSize, totalCount);
    let items = if (start >= totalCount) {
      [];
    } else {
      allMatches.sliceToArray(start, end_);
    };
    { items; totalCount; page = paging.page; pageSize = paging.pageSize };
  };

  /// Returns the "daily sloka" based on a date-derived index.
  public func getDailySloka(
    slokas : Map.Map<(Nat, Nat), Types.Sloka>,
    dayIndex : Nat,
  ) : ?Types.Sloka {
    let all = getAllSlokas(slokas);
    let count = all.size();
    if (count == 0) return null;
    ?all[dayIndex % count];
  };

  // ── Chapter helpers ───────────────────────────────────────────────────────────

  /// Returns all chapter metadata sorted by chapter number.
  public func getAllChapters(chapters : List.List<Types.ChapterMeta>) : [Types.ChapterMeta] {
    chapters.toArray();
  };

  /// Returns metadata for a single chapter.
  public func getChapter(
    chapters : List.List<Types.ChapterMeta>,
    chapterNumber : Nat,
  ) : ?Types.ChapterMeta {
    chapters.find(func(c : Types.ChapterMeta) : Bool { c.chapterNumber == chapterNumber });
  };

  // ── Seeding ───────────────────────────────────────────────────────────────────

  /// Seeds the store with initial sloka data (no-op if already seeded).
  public func seedSlokas(slokas : Map.Map<(Nat, Nat), Types.Sloka>) {
    if (not slokas.isEmpty()) return;

    let data : [(Nat, Nat, Types.Sloka)] = [
      // ── Chapter 1: Arjuna Vishada Yoga ────────────────────────────────────────
      (
        1,
        1,
        {
          chapterNumber = 1;
          slokaNumber = 1;
          sanskritText = "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१-१||";
          transliteration = "dhṛtarāṣṭra uvāca |\ndharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ||1-1||";
          meanings = {
            english = "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager to fight?";
            hindi = "धृतराष्ट्र ने कहा: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्रित हुए मेरे और पांडु के पुत्रों ने क्या किया?";
            telugu = "ధృతరాష్ట్రుడు అన్నాడు: ఓ సంజయా! ధర్మభూమియైన కురుక్షేత్రంలో పోరాడాలని సమావేశమైన నా పుత్రులు మరియు పాండు పుత్రులు ఏమి చేశారు?";
            sanskrit = "धृतराष्ट्र उवाच: हे सञ्जय! धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः मामकाः पाण्डवाश्च किमकुर्वत?";
          };
          explanation = "This is the opening verse of the Bhagavad Gita. Dhritarashtra, the blind king, asks his charioteer and minister Sanjaya to narrate the events unfolding on the battlefield of Kurukshetra. The term 'dharma-kshetra' (field of righteousness) is significant — even in war, dharma must prevail. The confrontation between the Kauravas and Pandavas marks a cosmic turning point.";
        },
      ),
      (
        1,
        20,
        {
          chapterNumber = 1;
          slokaNumber = 20;
          sanskritText = "अथ व्यवस्थितान्दृष्ट्वा धार्तराष्ट्रान् कपिध्वजः |\nप्रवृत्ते शस्त्रसम्पाते धनुरुद्यम्य पाण्डवः |\nहृषीकेशं तदा वाक्यमिदमाह महीपते ||१-२०||";
          transliteration = "atha vyavasthitān dṛṣṭvā dhārtarāṣṭrān kapi-dhvajaḥ |\npravṛtte śastra-sampāte dhanur udyamya pāṇḍavaḥ |\nhṛṣīkeśaṃ tadā vākyam idam āha mahī-pate ||1-20||";
          meanings = {
            english = "O King, seeing the sons of Dhritarashtra standing arrayed and the fight about to commence, Arjuna, whose flag bore the crest of Hanuman, took up his bow and spoke these words to Krishna.";
            hindi = "हे राजन! धार्तराष्ट्रों को व्यूहबद्ध देखकर, जब युद्ध प्रारम्भ होने वाला था, तब कपिध्वज पाण्डव अर्जुन ने धनुष उठाकर श्रीकृष्ण से ये वचन कहे।";
            telugu = "ఓ రాజా! ధార్తరాష్ట్రులు వ్యూహం పన్ని నిలిచి ఉండగా, యుద్ధం మొదలవబోయే సమయంలో, హనుమద్ధ్వజుడైన అర్జునుడు విల్లు పట్టుకొని కృష్ణునితో ఈ మాటలు పలికాడు.";
            sanskrit = "हे महीपते! धार्तराष्ट्रान् व्यवस्थितान् दृष्ट्वा, शस्त्रसम्पाते प्रवृत्ते, कपिध्वजः पाण्डवः धनुः उद्यम्य हृषीकेशम् इदं वाक्यमाह।";
          };
          explanation = "As the battle is about to begin, Arjuna — carrying the Hanuman emblem on his chariot flag — prepares to fight. His address to Krishna (Hrishikesha, Lord of the senses) sets the stage for the profound dialogue that is the Gita. The mention of the flag symbolizes that Arjuna's strength carries divine support.";
        },
      ),
      (
        1,
        28,
        {
          chapterNumber = 1;
          slokaNumber = 28;
          sanskritText = "अर्जुन उवाच |\ndṛṣṭvemaṃ svajanaṃ kṛṣṇa yuyutsuṃ samupasthitam |\nsīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati ||१-२८||";
          transliteration = "arjuna uvāca |\ndṛṣṭvemaṃ sva-janaṃ kṛṣṇa yuyutsuṃ samupasthitam |\nsīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati ||1-28||";
          meanings = {
            english = "Arjuna said: O Krishna, seeing my own kinsmen arrayed here, eager to fight, my limbs fail and my mouth is parched.";
            hindi = "अर्जुन बोले: हे कृष्ण! युद्ध के लिए तत्पर अपने स्वजनों को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूख रहा है।";
            telugu = "అర్జునుడు అన్నాడు: ఓ కృష్ణా! పోరాడాలని నిలిచిన నా స్వంత వారిని చూసి నా అవయవాలు శిథిలమవుతున్నాయి, నోరు ఎండిపోతోంది.";
            sanskrit = "अर्जुन उवाच: हे कृष्ण! युयुत्सुं स्वजनं दृष्ट्वा मम गात्राणि सीदन्ति, मुखं च परिशुष्यति।";
          };
          explanation = "This verse marks the onset of Arjuna's grief (Vishada). Faced with friends, teachers, and family on the opposing side, he experiences physical symptoms of despair — trembling limbs and a dry mouth. This psychological crisis is the catalyst for Krishna's teachings throughout the Gita.";
        },
      ),
      (
        1,
        47,
        {
          chapterNumber = 1;
          slokaNumber = 47;
          sanskritText = "एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् |\nविसृज्य सशरं चापं शोकसंविग्नमानसः ||१-४७||";
          transliteration = "evam uktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya sa-śaraṃ cāpaṃ śoka-saṃvigna-mānasaḥ ||1-47||";
          meanings = {
            english = "Having thus spoken on the battlefield, Arjuna cast aside his bow and arrows and sank down on the chariot seat, his mind overwhelmed with grief.";
            hindi = "रणभूमि में ऐसा कहकर अर्जुन ने सशर धनुष छोड़ दिया और शोक से व्याकुल मन से रथ के आसन पर बैठ गया।";
            telugu = "ఇలా రణభూమిలో పలికిన అర్జునుడు తన బాణాలతో సహా ధనుస్సును వదలి, శోకంతో మనసు కలతపడి రథంపై కూర్చుండిపోయాడు.";
            sanskrit = "एवम् उक्त्वा अर्जुनः सङ्ख्ये सशरं चापं विसृज्य शोकसंविग्नमानसः रथोपस्थे उपाविशत्।";
          };
          explanation = "This concluding verse of Chapter 1 shows Arjuna completely overwhelmed. Laying down his bow — the symbol of a warrior's duty — he surrenders to grief. This act of despair is paradoxically an act of surrender to Krishna, opening the door for divine wisdom. The Gita begins here, born from the depths of human suffering.";
        },
      ),
      // ── Chapter 2: Sankhya Yoga ────────────────────────────────────────────────
      (
        2,
        11,
        {
          chapterNumber = 2;
          slokaNumber = 11;
          sanskritText = "श्रीभगवानुवाच |\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ||२-११||";
          transliteration = "śrī-bhagavān uvāca |\naśocyān anvaśocas tvaṃ prajñā-vādāṃś ca bhāṣase |\ngatāsūn agatāsūṃś ca nānuśocanti paṇḍitāḥ ||2-11||";
          meanings = {
            english = "The Supreme Lord said: While speaking learned words, you are mourning for what is not worthy of grief. Those who are wise lament neither for the living nor for the dead.";
            hindi = "श्रीभगवान बोले: तू अशोचनीय के लिए शोक करता है और पण्डितों जैसी बातें करता है। पण्डितजन न मृतकों के लिए और न जीवितों के लिए शोक करते हैं।";
            telugu = "శ్రీ భగవానుడు అన్నాడు: నీవు శోకింపదగనివారి కోసం శోకిస్తున్నావు మరియు జ్ఞానుల మాటలు మాట్లాడుతున్నావు. పండితులు జీవించినవారికీ, మరణించినవారికీ శోకించరు.";
            sanskrit = "श्रीभगवान् उवाच: त्वम् अशोच्यान् अन्वशोचः प्रज्ञावादांश्च भाषसे। पण्डिताः गतासून् अगतासूंश्च न अनुशोचन्ति।";
          };
          explanation = "Krishna begins his divine teaching by pointing out the contradiction in Arjuna's behavior: he speaks with apparent wisdom but grieves over what does not deserve grief. The soul is eternal and indestructible; the body is temporary. A true pandit (wise person) knows that death is merely the soul leaving one body for another.";
        },
      ),
      (
        2,
        20,
        {
          chapterNumber = 2;
          slokaNumber = 20;
          sanskritText = "न जायते म्रियते वा कदाचित् नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ||२-२०||";
          transliteration = "na jāyate mriyate vā kadācit nāyaṃ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṃ purāṇo na hanyate hanyamāne śarīre ||2-20||";
          meanings = {
            english = "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.";
            hindi = "यह आत्मा किसी काल में न जन्मती है और न मरती है। यह उत्पन्न होकर फिर होने वाली नहीं है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के मारे जाने पर यह नहीं मारी जाती।";
            telugu = "ఈ ఆత్మ ఎప్పుడూ జన్మించదు, మరణించదు. ఇది ఉత్పన్నమై మళ్ళీ ఉండదు అని కాదు. ఇది అజన్మ, నిత్య, శాశ్వత, పురాతనమైనది. శరీరం చంపబడినప్పుడు ఇది చంపబడదు.";
            sanskrit = "अयम् आत्मा कदाचित् न जायते, न म्रियते वा। अयम् भूत्वा भविता न भूयः। अजः नित्यः शाश्वतः पुराणः — शरीरे हन्यमाने न हन्यते।";
          };
          explanation = "This is one of the most profound verses in the Gita. Krishna reveals the eternal, indestructible nature of the Atman (soul). It was never born, cannot die, and does not perish when the physical body perishes. This understanding liberates one from the fear of death and the grief of losing loved ones, since what is truly 'us' is beyond birth and death.";
        },
      ),
      (
        2,
        47,
        {
          chapterNumber = 2;
          slokaNumber = 47;
          sanskritText = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||२-४७||";
          transliteration = "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||2-47||";
          meanings = {
            english = "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.";
            hindi = "तेरा कर्म करने में ही अधिकार है, फलों में कभी नहीं। इसलिए तू कर्मफल का कारण भी मत बन और अकर्म में भी तेरी आसक्ति न हो।";
            telugu = "నీకు నిర్ణీత కర్మలు చేసే హక్కు మాత్రమే ఉంది, వాటి ఫలాలపై కాదు. కర్మ ఫలానికి కారణమవ్వవద్దు, అలాగే నిష్క్రియత్వంపై ఆసక్తి పెట్టుకోవద్దు.";
            sanskrit = "कर्मणि एव ते अधिकारः, फलेषु कदाचन न। मा कर्मफलहेतुः भूः, मा अकर्मणि ते सङ्गः अस्तु।";
          };
          explanation = "This is the most famous verse of the Bhagavad Gita — the essence of Nishkama Karma (desireless action). Krishna teaches that one should act without attachment to results. Do your duty wholeheartedly, but do not be enslaved by the desire for a particular outcome. This principle forms the foundation of Karma Yoga and is the cornerstone of righteous action in everyday life.";
        },
      ),
      (
        2,
        48,
        {
          chapterNumber = 2;
          slokaNumber = 48;
          sanskritText = "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय |\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ||२-४८||";
          transliteration = "yoga-sthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya |\nsiddhyasiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate ||2-48||";
          meanings = {
            english = "O Arjuna, perform your duty equipoised, abandoning all attachment to success or failure. Such equanimity is called Yoga.";
            hindi = "हे धनंजय! आसक्ति को त्यागकर योगस्थ होकर कर्म कर। सिद्धि और असिद्धि में समान रहकर काम कर — यही समत्व योग है।";
            telugu = "ఓ ధనంజయా! ఆసక్తిని వదిలి, సఫలత, వైఫల్యాలలో సమబుద్ధితో కర్మలు చేయి. ఈ సమత్వమే యోగమని చెప్పబడుతుంది.";
            sanskrit = "हे धनञ्जय! सङ्गं त्यक्त्वा योगस्थः कर्माणि कुरु। सिद्ध्यसिद्ध्योः समः भूत्वा — समत्वं योगः उच्यते।";
          };
          explanation = "This verse directly follows the famous 2:47 and expands on it. Krishna defines Yoga not as a physical practice but as a state of equanimity — maintaining inner balance in success and failure alike. True yoga is the ability to act without being controlled by results, experiencing both triumph and defeat with the same peaceful awareness.";
        },
      ),
      (
        2,
        62,
        {
          chapterNumber = 2;
          slokaNumber = 62;
          sanskritText = "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते |\nसङ्गात् संजायते कामः कामात्क्रोधोऽभिजायते ||२-६२||";
          transliteration = "dhyāyato viṣayān puṃsaḥ saṅgas teṣūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho 'bhijāyate ||2-62||";
          meanings = {
            english = "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.";
            hindi = "विषयों का चिंतन करने वाले पुरुष की उनमें आसक्ति हो जाती है, आसक्ति से काम उत्पन्न होता है और काम से क्रोध उत्पन्न होता है।";
            telugu = "ఇంద్రియ విషయాలను ధ్యానించే వ్యక్తికి వాటిపై ఆసక్తి కలుగుతుంది, ఆసక్తి నుండి కామం, కామం నుండి క్రోధం పుడుతుంది.";
            sanskrit = "विषयान् ध्यायतः पुंसः तेषु सङ्गः उपजायते। सङ्गात् कामः संजायते, कामात् क्रोधः अभिजायते।";
          };
          explanation = "Krishna describes the chain reaction that leads to moral downfall: thinking about sense objects creates attachment; attachment becomes desire; frustrated desire turns to anger. This verse is part of a famous sequence (2:62-63) describing the 'fall of man' through uncontrolled senses and how it destroys clarity of judgment.";
        },
      ),
      // ── Chapter 3: Karma Yoga ──────────────────────────────────────────────────
      (
        3,
        19,
        {
          chapterNumber = 3;
          slokaNumber = 19;
          sanskritText = "तस्मादसक्तः सततं कार्यं कर्म समाचर |\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ||३-१९||";
          transliteration = "tasmād asaktaḥ satataṃ kāryaṃ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||3-19||";
          meanings = {
            english = "Therefore, without attachment, perform always the work that has to be done, for man attains the Supreme by performing action without attachment.";
            hindi = "इसलिए तू सदा आसक्तिरहित होकर कर्तव्य-कर्म कर। आसक्तिरहित होकर कर्म करने वाला मनुष्य परमात्मा को प्राप्त होता है।";
            telugu = "అందువల్ల ఆసక్తి లేకుండా చేయవలసిన కర్మలు ఎల్లప్పుడూ చేయి. ఆసక్తి లేకుండా కర్మ చేసే మనుష్యుడు పరమాత్మను పొందుతాడు.";
            sanskrit = "तस्मात् असक्तः सन् सततं कार्यं कर्म समाचर। असक्तः कर्म आचरन् पूरुषः परम् आप्नोति।";
          };
          explanation = "The central teaching of Karma Yoga: perform your duties without attachment to personal gain. This verse is the practical application of BG 2:47. When actions are performed as offerings to the Divine, without ego-driven motive, they become a path to liberation (moksha). The liberated person acts not from need, but from love and duty.";
        },
      ),
      (
        3,
        27,
        {
          chapterNumber = 3;
          slokaNumber = 27;
          sanskritText = "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः |\nअहंकारविमूढात्मा कर्ताहमिति मन्यते ||३-२७||";
          transliteration = "prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ |\nahaṅkāra-vimūḍhātmā kartāham iti manyate ||3-27||";
          meanings = {
            english = "All actions are performed by the gunas (qualities) of material nature. But the soul deluded by ego thinks itself to be the doer.";
            hindi = "वास्तव में सभी कर्म प्रकृति के गुणों द्वारा सम्पन्न होते हैं, परन्तु अहंकार से मोहित आत्मा 'मैं कर्ता हूँ' ऐसा मानता है।";
            telugu = "వాస్తవానికి అన్ని కర్మలూ ప్రకృతి గుణాల చేత నిర్వహించబడుతున్నాయి. కానీ అహంకారంతో మోహితమైన ఆత్మ 'నేను కర్తను' అని భావిస్తుంది.";
            sanskrit = "सर्वशः कर्माणि प्रकृतेः गुणैः क्रियमाणानि। अहंकारविमूढात्मा 'कर्ता अहम्' इति मन्यते।";
          };
          explanation = "Krishna explains the concept of doership through the lens of the three gunas (sattva, rajas, tamas). Nature (Prakriti) acts through these qualities; the individual soul is the witnessing consciousness. When ego (ahamkara) deludes the self, it mistakes itself for the doer. Spiritual wisdom means recognizing Prakriti as the actor and the Self as the witness.";
        },
      ),
      (
        3,
        35,
        {
          chapterNumber = 3;
          slokaNumber = 35;
          sanskritText = "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् |\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ||३-३५||";
          transliteration = "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṃ śreyaḥ para-dharmo bhayāvahaḥ ||3-35||";
          meanings = {
            english = "It is far better to perform one's own duties imperfectly than to master the duties of another. Better is even death in the discharge of one's own duty; the duty of another is fraught with fear.";
            hindi = "भली-भांति आचरण किए हुए पर-धर्म से अपना धर्म गुणरहित भी अच्छा है। अपने धर्म में मरण भी कल्याणकारक है, दूसरे का धर्म भय देने वाला है।";
            telugu = "బాగా ఆచరించబడిన పరధర్మం కంటే, అసంపూర్ణంగా ఆచరించిన స్వధర్మం శ్రేష్ఠమైనది. స్వధర్మంలో మరణం కూడా శ్రేయస్కరమే, పరధర్మం భయావహమైనది.";
            sanskrit = "सुनुष्ठितात् परधर्मात् विगुणः स्वधर्मः श्रेयान्। स्वधर्मे निधनम् श्रेयः, परधर्मः भयावहः।";
          };
          explanation = "This verse presents the concept of Svadharma — one's own duty based on nature, circumstance, and social role. It is better to fulfill your own path imperfectly than to perfectly imitate another's. Each soul has a unique spiritual curriculum. Forcing oneself into a foreign role breeds confusion and fear. This principle is foundational to the caste system's original spiritual intent (not its later distortions).";
        },
      ),
      (
        3,
        42,
        {
          chapterNumber = 3;
          slokaNumber = 42;
          sanskritText = "इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः |\nमनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु सः ||३-४२||";
          transliteration = "indriyāṇi parāṇy āhur indriyebhyaḥ paraṃ manaḥ |\nmanasas tu parā buddhir yo buddheḥ paratas tu saḥ ||3-42||";
          meanings = {
            english = "The senses are said to be superior to the body; the mind is superior to the senses; the intellect is superior to the mind; and what is superior even to the intellect is the Self.";
            hindi = "इन्द्रियों को स्थूल शरीर से श्रेष्ठ कहते हैं; मन को इन्द्रियों से श्रेष्ठ कहते हैं; बुद्धि को मन से श्रेष्ठ कहते हैं; और जो बुद्धि से भी परे है, वह आत्मा है।";
            telugu = "ఇంద్రియాలు శరీరం కంటే శ్రేష్ఠమైనవని చెప్పబడ్డాయి; మనస్సు ఇంద్రియాల కంటే శ్రేష్ఠమైనది; బుద్ధి మనస్సు కంటే శ్రేష్ఠమైనది; బుద్ధి కంటే పరమైనది ఆత్మ.";
            sanskrit = "इन्द्रियाणि पराणि आहुः। इन्द्रियेभ्यः परं मनः। मनसः तु परा बुद्धिः। यः बुद्धेः परतः — सः (आत्मा)।";
          };
          explanation = "Krishna describes the hierarchy of consciousness: body → senses → mind → intellect → Atman. The Self (Atman) is the ultimate reality, superior to all mental processes. Understanding this hierarchy helps one transcend sense-driven behavior. By engaging higher faculties of intellect and spiritual wisdom, one can overcome base desires and live in alignment with the Divine.";
        },
      ),
    ];

    let data2 : [(Nat, Nat, Types.Sloka)] = [
      // ── Chapter 4: Jnana Karma Sanyasa Yoga ───────────────────────────────────
      (
        4,
        7,
        {
          chapterNumber = 4;
          slokaNumber = 7;
          sanskritText = "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ||४-७||";
          transliteration = "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham ||4-7||";
          meanings = {
            english = "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself.";
            hindi = "हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ।";
            telugu = "ఓ భారతా! ఎప్పుడెప్పుడు ధర్మానికి హాని కలిగి అధర్మం వృద్ధి చెందుతుందో, అప్పుడప్పుడు నేను నన్ను నేను సృష్టించుకుంటాను.";
            sanskrit = "हे भारत! यदा यदा धर्मस्य ग्लानिः भवति, अधर्मस्य अभ्युत्थानम् च, तदा अहम् आत्मानं सृजामि।";
          };
          explanation = "This is one of the most celebrated verses of the Gita, announcing Krishna's promise of divine descent (avatar). Whenever dharma weakens and adharma rises, God incarnates in a form appropriate to the age to restore cosmic balance. This principle underlies the concept of avatars in Hinduism and assures devotees that the Divine is never absent from creation.";
        },
      ),
      (
        4,
        8,
        {
          chapterNumber = 4;
          slokaNumber = 8;
          sanskritText = "परित्राणाय साधूनां विनाशाय च दुष्कृताम् |\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ||४-८||";
          transliteration = "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām |\ndharma-saṃsthāpanārthāya sambhavāmi yuge yuge ||4-8||";
          meanings = {
            english = "To deliver the pious and annihilate the miscreants, as well as to re-establish the principles of dharma, I appear millennium after millennium.";
            hindi = "साधुओं की रक्षा करने के लिए, दुष्टों का विनाश करने के लिए और धर्म की स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।";
            telugu = "సాధువులను రక్షించడానికి, దుష్టులను నాశనం చేయడానికి మరియు ధర్మాన్ని స్థాపించడానికి నేను యుగయుగాలలో అవతరిస్తాను.";
            sanskrit = "साधूनां परित्राणाय, दुष्कृतां विनाशाय च, धर्मसंस्थापनार्थाय — युगे युगे अहं सम्भवामि।";
          };
          explanation = "This verse follows directly from 4:7 and elaborates on the three-fold purpose of divine incarnation: to protect the righteous, to destroy the wicked, and to re-establish dharma. Each avatar of Vishnu/Krishna serves these purposes in its own way. This verse gives hope to devotees that evil will not prevail permanently, and that the Divine always acts in the interest of cosmic order.";
        },
      ),
      // ── Chapter 5: Karma Sanyasa Yoga ─────────────────────────────────────────
      (
        5,
        18,
        {
          chapterNumber = 5;
          slokaNumber = 18;
          sanskritText = "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः ||५-१८||";
          transliteration = "vidyā-vinaya-sampanne brāhmaṇe gavi hastini |\nśuni caiva śva-pāke ca paṇḍitāḥ sama-darśinaḥ ||5-18||";
          meanings = {
            english = "The humble sages see with equal vision a learned and gentle brahmin, a cow, an elephant, a dog and a dog-eater.";
            hindi = "ज्ञानी पुरुष विद्या और विनय से सम्पन्न ब्राह्मण, गाय, हाथी, कुत्ते और चाण्डाल में समान दृष्टि रखते हैं।";
            telugu = "జ్ఞానులు విద్యా వినయ సంపన్నుడైన బ్రాహ్మణులలో, ఆవులో, ఏనుగులో, కుక్కలో మరియు చండాలులో సమదృష్టి కలిగి ఉంటారు.";
            sanskrit = "विद्याविनयसम्पन्ने ब्राह्मणे, गवि, हस्तिनि, शुनि, श्वपाके च — पण्डिताः समदर्शिनः।";
          };
          explanation = "This verse describes the vision of a true sage (pandit): one who sees the same divine essence in all beings, regardless of their social status, species, or form. From the learned brahmin to the outcaste dog-eater, from a noble elephant to a humble cow, the enlightened person perceives the same Atman. This is the spiritual democracy that Krishna teaches — the soul is beyond social hierarchies.";
        },
      ),
      (
        5,
        22,
        {
          chapterNumber = 5;
          slokaNumber = 22;
          sanskritText = "ये हि संस्पर्शजा भोगा दुःखयोनय एव ते |\nआद्यन्तवन्तः कौन्तेय न तेषु रमते बुधः ||५-२२||";
          transliteration = "ye hi saṃsparśa-jā bhogā duḥkha-yonaya eva te |\nādy-antavantaḥ kaunteya na teṣu ramate budhaḥ ||5-22||";
          meanings = {
            english = "The pleasures born of sense-contact are verily the wombs of sorrow. They have a beginning and an end, O Kaunteya. The wise man does not rejoice in them.";
            hindi = "हे कौन्तेय! जो इन्द्रिय-संयोग से उत्पन्न भोग हैं, वे दुःख के कारण हैं। उनका आदि और अन्त है, इसलिए बुद्धिमान व्यक्ति उनमें आनन्द नहीं लेता।";
            telugu = "ఓ కౌంతేయా! ఇంద్రియ స్పర్శ వలన పుట్టే భోగాలు దుఃఖానికి మూలం. వాటికి మొదలు మరియు చివర ఉంటాయి. బుద్ధిమంతుడు వాటిలో రమించడు.";
            sanskrit = "हे कौन्तेय! ये संस्पर्शजाः भोगाः — ते दुःखयोनयः एव। ते आद्यन्तवन्तः। तेषु बुधः न रमते।";
          };
          explanation = "Krishna explains the impermanent and ultimately painful nature of sense pleasures. All experiences gained through the five senses have a beginning and an end, making them inherently unstable. The temporary joy they provide inevitably turns to sorrow when they end. The truly wise person finds deeper, lasting joy within rather than in the fleeting pleasures of the external world.";
        },
      ),
      // ── Chapter 6: Dhyana Yoga ─────────────────────────────────────────────────
      (
        6,
        5,
        {
          chapterNumber = 6;
          slokaNumber = 5;
          sanskritText = "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ||६-५||";
          transliteration = "uddhared ātmanātmānaṃ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||6-5||";
          meanings = {
            english = "One must elevate, not degrade, oneself by one's own mind. The mind is the friend of the conditioned soul, and his enemy as well.";
            hindi = "मनुष्य को चाहिए कि वह अपने मन से अपना उद्धार करे, अपने को अधोगति में न डाले। मन ही मनुष्य का मित्र है और मन ही शत्रु भी।";
            telugu = "మనిషి తన మనస్సు ద్వారా తనను తాను ఉద్ధరించుకోవాలి, పతనమవ్వవద్దు. మనస్సే ఆత్మకు మిత్రుడు, మనస్సే శత్రువు కూడా.";
            sanskrit = "आत्मना आत्मानम् उद्धरेत्, आत्मानम् न अवसादयेत्। आत्मा एव आत्मनः बन्धुः, आत्मा एव रिपुः।";
          };
          explanation = "Krishna teaches personal responsibility for one's spiritual evolution. The mind can be our greatest ally or our most formidable enemy. When disciplined and turned inward, it elevates us; when it runs after sense objects, it degrades us. This verse places the power of liberation entirely in one's own hands — we are the architects of our own destiny. No external force can save or destroy us — only our own mind.";
        },
      ),
      (
        6,
        34,
        {
          chapterNumber = 6;
          slokaNumber = 34;
          sanskritText = "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् |\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम् ||६-३४||";
          transliteration = "cañcalaṃ hi manaḥ kṛṣṇa pramāthi balavad dṛḍham |\ntasyāhaṃ nigrahaṃ manye vāyor iva su-duṣkaram ||6-34||";
          meanings = {
            english = "O Krishna, the mind is restless, turbulent, obstinate and very strong, and to subdue it, I think, is more difficult than controlling the wind.";
            hindi = "हे कृष्ण! मन बड़ा चंचल, हठी, बलवान और दृढ़ है। मेरी राय में इसे वश में करना वायु को वश में करने के समान अत्यंत कठिन है।";
            telugu = "ఓ కృష్ణా! మనస్సు చంచలమైనది, అది బలమైన, దృఢమైన, తప్పిదకారి. దీన్ని అదుపు చేయడం వాయువును నిరోధించడం కంటే కష్టం అని నేను భావిస్తున్నాను.";
            sanskrit = "हे कृष्ण! मनः चञ्चलम्, प्रमाथि, बलवत्, दृढम्। तस्य निग्रहम् वायोः इव सुदुष्करं मन्ये।";
          };
          explanation = "Arjuna candidly admits the difficulty of controlling the mind. He compares the task to controlling the wind — something seemingly impossible. This is a deeply relatable verse that acknowledges the practical challenge of meditation and mental discipline. Krishna's response (6:35) assures that with practice (abhyasa) and detachment (vairagya), the mind can indeed be restrained.";
        },
      ),
      // ── Chapter 7: Jnana Vijnana Yoga ─────────────────────────────────────────
      (
        7,
        7,
        {
          chapterNumber = 7;
          slokaNumber = 7;
          sanskritText = "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ||७-७||";
          transliteration = "mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva ||7-7||";
          meanings = {
            english = "There is nothing else besides Me, O Dhananjaya. Like clusters of yarn-beads formed by knots on a thread, all this is threaded on Me.";
            hindi = "हे धनञ्जय! मुझसे परे और कुछ भी नहीं है। जैसे धागे में मोतियों की माला पिरोई होती है, वैसे ही यह सब मुझमें पिरोया हुआ है।";
            telugu = "ఓ ధనంజయా! నాకు పరమైనది ఏదీ లేదు. దారంలో మణులు గుచ్చినట్లు, ఈ సమస్తం నాలో గుచ్చబడి ఉంది.";
            sanskrit = "हे धनञ्जय! मत्तः परतरम् अन्यत् किञ्चित् नास्ति। सूत्रे मणिगणाः इव — मयि सर्वम् इदं प्रोतम्।";
          };
          explanation = "Krishna declares His supremacy using the beautiful metaphor of beads strung on a thread. Just as every bead in a necklace is connected by a single thread running through all of them, all of existence is connected through Krishna as the underlying Divine consciousness. Nothing in creation exists independently — everything is woven into the fabric of the Supreme.";
        },
      ),
      (
        7,
        19,
        {
          chapterNumber = 7;
          slokaNumber = 19;
          sanskritText = "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते |\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः ||७-१९||";
          transliteration = "bahūnāṃ janmanām ante jñānavān māṃ prapadyate |\nvāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ ||7-19||";
          meanings = {
            english = "After many births and deaths, he who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare.";
            hindi = "बहुत जन्मों के अंत में ज्ञानवान मनुष्य 'वासुदेव ही सब कुछ है' — इस प्रकार जानकर मुझे प्राप्त होता है। ऐसा महात्मा अत्यन्त दुर्लभ है।";
            telugu = "అనేక జన్మల అనంతరం జ్ఞానవంతుడు 'వాసుదేవుడే సర్వం' అని తెలుసుకుని నన్ను పొందుతాడు. అటువంటి మహాత్ముడు చాలా అరుదు.";
            sanskrit = "बहूनां जन्मनाम् अन्ते ज्ञानवान् 'वासुदेवः सर्वम्' इति मां प्रपद्यते। सः महात्मा सुदुर्लभः।";
          };
          explanation = "Krishna reveals that genuine spiritual wisdom — the realization that Vasudeva (Krishna) is everything — is the culmination of a long spiritual journey across many lifetimes. This supreme understanding is not achieved quickly; it is the fruit of sustained practice and grace. The person who attains this wisdom is called a Mahatma (great soul) and is described as extremely rare and precious.";
        },
      ),
      // ── Chapter 8: Aksara Brahma Yoga ─────────────────────────────────────────
      (
        8,
        7,
        {
          chapterNumber = 8;
          slokaNumber = 7;
          sanskritText = "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च |\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयः ||८-७||";
          transliteration = "tasmāt sarveṣu kāleṣu mām anusmara yudhya ca |\nmayyarpita-mano-buddhir mām evaiṣyasy asaṃśayaḥ ||8-7||";
          meanings = {
            english = "Therefore, Arjuna, you should always think of Me in the form of Krishna and at the same time carry out your duty. You will certainly come to Me.";
            hindi = "इसलिए हे अर्जुन! सभी समयों में मेरा स्मरण कर और युद्ध भी कर। मुझमें मन और बुद्धि अर्पण करके तू निःसंदेह मुझे ही प्राप्त होगा।";
            telugu = "అందువల్ల ఓ అర్జునా! అన్ని వేళలా నన్ను స్మరించు మరియు యుద్ధం కూడా చేయి. నాలో మనస్సు, బుద్ధి అర్పించి నిస్సందేహంగా నన్నే పొందుతావు.";
            sanskrit = "तस्मात् सर्वेषु कालेषु माम् अनुस्मर, युध्य च। मयि अर्पित-मनो-बुद्धिः सन् — माम् एव एष्यसि, असंशयः।";
          };
          explanation = "Krishna gives a practical and profound instruction: remember Me always, even while performing your worldly duties. This is the secret of integrating spiritual practice into daily life. One does not need to retire to a forest to find God; one can find Him in the midst of action. The mind devoted to the Divine will naturally return to it at the time of death and attain liberation.";
        },
      ),
      (
        8,
        15,
        {
          chapterNumber = 8;
          slokaNumber = 15;
          sanskritText = "मामुपेत्य पुनर्जन्म दुःखालयमशाश्वतम् |\nनाप्नुवन्ति महात्मानः संसिद्धिं परमां गताः ||८-१५||";
          transliteration = "mām upetya punar janma duḥkhālayam aśāśvatam |\nnāpnuvanti mahātmānaḥ saṃsiddhiṃ paramāṃ gatāḥ ||8-15||";
          meanings = {
            english = "After attaining Me, the great souls, who are yogis in devotion, never return to this temporary world, which is full of miseries, because they have attained the highest perfection.";
            hindi = "मुझे प्राप्त होकर महात्मा लोग पुनर्जन्म को नहीं प्राप्त होते, जो कि दुःखों का घर और अनित्य है, क्योंकि वे परम सिद्धि को प्राप्त हो जाते हैं।";
            telugu = "నన్ను చేరిన మహాత్ములు, దుఃఖమయమైన ఈ నశ్వర లోకంలో మళ్ళీ జన్మించరు, ఎందుకంటే వారు పరమ సిద్ధిని పొందారు.";
            sanskrit = "माम् उपेत्य महात्मानः दुःखालयम् अशाश्वतम् पुनर्जन्म न आप्नुवन्ति — ते परमां संसिद्धिं गताः।";
          };
          explanation = "Krishna promises the ultimate liberation: those great souls who reach Him are freed from the cycle of birth and death forever. This material world is described as 'dukhkhalayam' — the home of suffering — and 'ashashvatam' — impermanent. The highest spiritual attainment is to transcend this cycle and merge with the Divine, never to return to the pain of conditioned existence.";
        },
      ),
      // ── Chapter 9: Raja Vidya Raja Guhya Yoga ─────────────────────────────────
      (
        9,
        22,
        {
          chapterNumber = 9;
          slokaNumber = 22;
          sanskritText = "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ||९-२२||";
          transliteration = "ananyāś cintayanto māṃ ye janāḥ paryupāsate |\nteṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham ||9-22||";
          meanings = {
            english = "But those who always worship Me with exclusive devotion, meditating on My transcendental form — to them, I carry what they lack, and I preserve what they have.";
            hindi = "जो भक्त अनन्य भाव से मेरा चिंतन करते हुए मुझे उपासते हैं, उन नित्य-युक्त भक्तों का योगक्षेम (प्राप्ति और रक्षा) मैं स्वयं करता हूँ।";
            telugu = "అనన్యభావంతో నన్ను ధ్యానిస్తూ ఉపాసించే భక్తుల యోగక్షేమాన్ని (లేనిది ఇవ్వడం, ఉన్నది కాపాడడం) నేను స్వయంగా వహిస్తాను.";
            sanskrit = "ये जनाः अनन्याः मां चिन्तयन्तः पर्युपासते — तेषां नित्याभियुक्तानाम् योगक्षेमं अहम् वहामि।";
          };
          explanation = "This is one of the most reassuring verses in the Gita — a direct promise of divine protection. Krishna declares that those who worship Him with undivided devotion need not worry about anything. He personally takes responsibility for providing what they lack (yoga) and protecting what they already have (kshema). This verse is often recited as an assurance of God's unconditional care for His devotees.";
        },
      ),
      (
        9,
        26,
        {
          chapterNumber = 9;
          slokaNumber = 26;
          sanskritText = "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ||९-२६||";
          transliteration = "patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati |\ntad ahaṃ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||9-26||";
          meanings = {
            english = "If one offers Me with love and devotion a leaf, a flower, fruit or water, I will accept it.";
            hindi = "जो भक्त मुझे प्रेम से पत्र, पुष्प, फल या जल अर्पित करता है, उस शुद्धचित्त भक्त का भक्तिपूर्वक अर्पित वह उपहार मैं स्वीकार करता हूँ।";
            telugu = "ఎవరైనా నాకు భక్తితో ఒక ఆకు, పువ్వు, పండు లేదా నీరు అర్పించినా, శుద్ధమనసుతో భక్తిగా అర్పించిన ఆ కానుకను నేను స్వీకరిస్తాను.";
            sanskrit = "यः भक्त्या पत्रं, पुष्पं, फलम्, तोयं मे प्रयच्छति — तत् प्रयतात्मनः भक्त्युपहृतम् अश्नामि।";
          };
          explanation = "Krishna makes clear that devotion, not wealth or grand offerings, is what matters to the Divine. He accepts even the humblest offering — a leaf, a flower, fruit, or water — if it is given with love and purity of heart. This verse has democratized worship across India, assuring the poorest devotee that they have full access to God's grace. It is the essence of bhakti: love transcends all material considerations.";
        },
      ),
      // ── Chapter 10: Vibhuti Yoga ───────────────────────────────────────────────
      (
        10,
        41,
        {
          chapterNumber = 10;
          slokaNumber = 41;
          sanskritText = "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा |\nतत्तदेवावगच्छ त्वं मम तेजोंऽशसम्भवम् ||१०-४१||";
          transliteration = "yad yad vibhūtimat sattvaṃ śrīmad ūrjitam eva vā |\ntat tad evāvagaccha tvaṃ mama tejo 'ṃśa-sambhavam ||10-41||";
          meanings = {
            english = "Know that all opulent, beautiful and glorious creations spring from but a spark of My splendor.";
            hindi = "जो भी वैभवशाली, श्रीमान् और शक्तिशाली वस्तु है, उसे मेरे तेज के अंश से ही उत्पन्न समझो।";
            telugu = "శక్తివంతమైన, శ్రీమంతమైన, వైభవోపేతమైన ప్రతిదీ నా తేజస్సు యొక్క ఒక స్ఫులింగం నుండి జన్మించిందని తెలుసుకో.";
            sanskrit = "यत् यत् विभूतिमत् सत्त्वं श्रीमत् ऊर्जितम् वा — तत् तत् एव मम तेजः-अंश-सम्भवम् अवगच्छ त्वम्।";
          };
          explanation = "This verse is the climactic summary of Chapter 10's extensive description of divine glories. Rather than listing every manifestation of the Divine in creation, Krishna gives a simple formula: wherever you see greatness, beauty, power, or splendor — know that it is a spark of His divine radiance. This transforms everyday perception into a form of worship, seeing God in all excellence.";
        },
      ),
      (
        10,
        20,
        {
          chapterNumber = 10;
          slokaNumber = 20;
          sanskritText = "अहमात्मा गुडाकेश सर्वभूताशयस्थितः |\nअहमादिश्च मध्यं च भूतानामन्त एव च ||१०-२०||";
          transliteration = "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ |\naham ādiś ca madhyaṃ ca bhūtānām anta eva ca ||10-20||";
          meanings = {
            english = "I am the Self, O Gudakesha, seated in the hearts of all creatures. I am the beginning, the middle and the end of all beings.";
            hindi = "हे गुडाकेश! मैं सभी प्राणियों के हृदय में स्थित आत्मा हूँ। मैं सभी प्राणियों का आदि, मध्य और अंत हूँ।";
            telugu = "ఓ గుడాకేశా! నేను సర్వప్రాణుల హృదయంలో స్థితుడైన ఆత్మను. నేను సర్వప్రాణుల ఆది, మధ్య మరియు అంతం.";
            sanskrit = "हे गुडाकेश! अहम् सर्वभूत-आशयस्थितः आत्मा। अहम् एव भूतानाम् आदिः, मध्यम्, अन्तः च।";
          };
          explanation = "Krishna reveals His omnipresence: He is the Atman seated in the hearts of all beings, the source from which all existence emerges, the sustaining principle through which it continues, and the final destination into which it dissolves. This verse encapsulates the entire cosmology of the Gita — the Divine is immanent in creation as its very soul and transcendent as its origin and end.";
        },
      ),
      // ── Chapter 11: Vishwarupa Darshana Yoga ──────────────────────────────────
      (
        11,
        7,
        {
          chapterNumber = 11;
          slokaNumber = 7;
          sanskritText = "इहैकस्थं जगत्कृत्स्नं पश्याद्य सचराचरम् |\nमम देहे गुडाकेश यच्चान्यद्द्रष्टुमिच्छसि ||११-७||";
          transliteration = "ihaika-sthaṃ jagat kṛtsnaṃ paśyādya sa-carācaram |\nmama dehe guḍākeśa yac cānyad draṣṭum icchasi ||11-7||";
          meanings = {
            english = "Whatever you wish to see, behold at once in this body of Mine! This universal form can show you whatever you desire.";
            hindi = "हे गुडाकेश! आज मेरे इस शरीर में एक जगह स्थित संपूर्ण जगत को — चर और अचर — देखो। और जो कुछ तुम देखना चाहते हो, वह सब देखो।";
            telugu = "ఓ గుడాకేశా! నా ఈ శరీరంలో ఒకే చోట స్థితమైన చరాచర సమేత సమస్త జగత్తును నేడు చూడు. నీవు ఇంకా చూడాలని ఉన్నదేదైనా చూడు.";
            sanskrit = "हे गुडाकेश! आज इहैकस्थं सचराचरं जगत् कृत्स्नं मम देहे पश्य। यत् च अन्यत् द्रष्टुम् इच्छसि — तत् अपि।";
          };
          explanation = "This verse introduces the Vishwarupa (Universal Form) vision. Krishna invites Arjuna to behold the entire universe — all moving and non-moving things — within His divine body. This is the supreme theophany in the Gita, where the personal God reveals His cosmic form. Krishna grants Arjuna divine vision to perceive this, as the cosmic form is beyond ordinary human perception.";
        },
      ),
      (
        11,
        33,
        {
          chapterNumber = 11;
          slokaNumber = 33;
          sanskritText = "तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम् |\nमयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन् ||११-३३||";
          transliteration = "tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham |\nmayaivaite nihatāḥ pūrvam eva nimitta-mātraṃ bhava savyasācin ||11-33||";
          meanings = {
            english = "Therefore get up and fight! You will conquer your enemies and enjoy a flourishing kingdom. They are already put to death by My arrangement, and you, O Savyasachi, can be but an instrument in the fight.";
            hindi = "इसलिए तू खड़ा हो और शत्रुओं को जीतकर यश प्राप्त कर, समृद्ध राज्य का भोग कर। ये सब पहले से ही मेरे द्वारा मारे जा चुके हैं — तू केवल निमित्त मात्र बन, हे सव्यसाचिन!";
            telugu = "అందువల్ల నీవు లేచి యుద్ధం చేయి! శత్రువులను జయించి సమృద్ధమైన రాజ్యాన్ని అనుభవించు. వీరందరూ ఇప్పటికే నా చేత చంపబడ్డారు — ఓ సవ్యసాచీ! నీవు కేవలం నిమిత్తమాత్రుడవు.";
            sanskrit = "तस्मात् त्वम् उत्तिष्ठ, यशः लभस्व, शत्रून् जित्वा समृद्धं राज्यं भुङ्क्ष्व। एते मयैव पूर्वम् एव निहताः — हे सव्यसाचिन्! त्वं निमित्तमात्रं भव।";
          };
          explanation = "In the midst of the awe-inspiring Vishwarupa vision, Krishna gives Arjuna a direct command: rise and fight! He reveals that the enemies are already defeated by divine will — Arjuna is merely the instrument through which this plays out. This verse profoundly addresses the question of free will and divine will: we act, but the ultimate results are in God's hands. Our role is to be a willing, conscious instrument.";
        },
      ),
      // ── Chapter 12: Bhakti Yoga ────────────────────────────────────────────────
      (
        12,
        13,
        {
          chapterNumber = 12;
          slokaNumber = 13;
          sanskritText = "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी ||१२-१३||";
          transliteration = "adveṣṭā sarva-bhūtānāṃ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||12-13||";
          meanings = {
            english = "One who is not envious but is a kind friend to all creatures, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant...";
            hindi = "जो सभी प्राणियों से द्वेष नहीं करता, जो मित्रवत् और करुणावान् है, जो ममता और अहंकार से रहित है, जो सुख और दुःख में समान रहता है और क्षमाशील है...";
            telugu = "సర్వప్రాణులపై ద్వేషం లేనివాడు, మైత్రీ కరుణాశీలి, మమత్వం, అహంకారం లేనివాడు, సుఖదుఃఖాలలో సమభావుడు, క్షమాశీలి...";
            sanskrit = "सर्वभूतानाम् अद्वेष्टा, मैत्रः, करुणः, निर्ममः, निरहंकारः, समदुःखसुखः, क्षमी...";
          };
          explanation = "This verse begins a beautiful enumeration (continuing through 12:20) of the qualities of the ideal devotee whom Krishna loves most. These include: no hatred for any being, friendliness, compassion, no sense of 'mine', no ego, equanimity in pleasure and pain, forgiveness. This is the practical face of bhakti — devotion expressed through character and virtue in daily life.";
        },
      ),
      (
        12,
        6,
        {
          chapterNumber = 12;
          slokaNumber = 6;
          sanskritText = "ये तु सर्वाणि कर्माणि मयि संन्यस्य मत्पराः |\nअनन्येनैव योगेन मां ध्यायन्त उपासते ||१२-६||";
          transliteration = "ye tu sarvāṇi karmāṇi mayi sannyasya mat-parāḥ |\nananyenaiva yogena māṃ dhyāyanta upāsate ||12-6||";
          meanings = {
            english = "But those who worship Me with devotion, meditating on My transcendental form, giving up all their actions to Me and regarding Me as the supreme goal...";
            hindi = "जो सभी कर्म मुझमें अर्पित करके और मुझे ही परम लक्ष्य मानकर, अनन्य योग से मेरा ध्यान करते हुए मेरी उपासना करते हैं...";
            telugu = "అన్ని కర్మలను నాలో సమర్పించి, నన్నే పరమ లక్ష్యంగా భావించి, అనన్య యోగంతో నన్ను ధ్యానిస్తూ ఉపాసించేవారు...";
            sanskrit = "ये तु सर्वाणि कर्माणि मयि संन्यस्य मत्पराः सन्तः अनन्येन योगेन माम् ध्यायन्तः उपासते...";
          };
          explanation = "Krishna describes the highest form of devotion: surrendering all actions to the Divine, having no other goal but God, and meditating on the divine form with undivided focus. This is total surrender (sharanagati) — the devotee places every aspect of life, every action and every goal, into the hands of the Divine. This chapter reveals that such pure bhakti is the most direct path to liberation.";
        },
      ),
      // ── Chapter 13: Kshetra Kshetragjna Vibhaga Yoga ──────────────────────────
      (
        13,
        2,
        {
          chapterNumber = 13;
          slokaNumber = 2;
          sanskritText = "क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत |\nक्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम ||१३-२||";
          transliteration = "kṣetrajñaṃ cāpi māṃ viddhi sarva-kṣetreṣu bhārata |\nkṣetra-kṣetrajñayor jñānaṃ yat taj jñānaṃ mataṃ mama ||13-2||";
          meanings = {
            english = "O scion of Bharata, you should understand that I am also the knower in all bodies, and to understand this body and its knower is called knowledge.";
            hindi = "हे भारत! सभी क्षेत्रों में क्षेत्रज्ञ भी मुझे ही जान। क्षेत्र और क्षेत्रज्ञ का यह ज्ञान — यही ज्ञान है, ऐसा मेरा मत है।";
            telugu = "ఓ భారతా! సర్వ క్షేత్రాలలో క్షేత్రజ్ఞుడు కూడా నేనే అని తెలుసుకో. క్షేత్ర-క్షేత్రజ్ఞుల జ్ఞానమే జ్ఞానమని నా అభిప్రాయం.";
            sanskrit = "हे भारत! सर्वक्षेत्रेषु क्षेत्रज्ञम् अपि माम् विद्धि। क्षेत्र-क्षेत्रज्ञयोः यत् ज्ञानम् — तत् ज्ञानम् मम मतम्।";
          };
          explanation = "Krishna introduces the central metaphysical framework of Chapter 13: the body is the 'field' (kshetra) and the soul that knows it is the 'knower of the field' (kshetrajna). He declares that He is the ultimate Kshetrajna in all bodies — the universal witness consciousness. True knowledge is understanding this distinction between the body (matter) and the soul (consciousness), and recognizing the Divine as the supreme knower behind all individual selves.";
        },
      ),
      (
        13,
        28,
        {
          chapterNumber = 13;
          slokaNumber = 28;
          sanskritText = "समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम् |\nविनश्यत्स्वविनश्यन्तं यः पश्यति स पश्यति ||१३-२८||";
          transliteration = "samaṃ sarveṣu bhūteṣu tiṣṭhantaṃ parameśvaram |\nvinaśyatsv avinaśyantaṃ yaḥ paśyati sa paśyati ||13-28||";
          meanings = {
            english = "One who sees the Supersoul equally present everywhere, in every living being, does not degrade himself by his mind. Thus he approaches the transcendental destination.";
            hindi = "जो सभी नष्ट होते प्राणियों में परमेश्वर को समान रूप से स्थित और अविनाशी देखता है, वही वास्तव में देखता है।";
            telugu = "నశించే సర్వ ప్రాణులలో పరమేశ్వరుడు సమంగా నిలిచి, నశించడం లేదని చూసేవాడే నిజంగా చూసేవాడు.";
            sanskrit = "यः विनश्यत्सु सर्वेषु भूतेषु परमेश्वरं समं तिष्ठन्तम् अविनश्यन्तं पश्यति — सः पश्यति।";
          };
          explanation = "This verse defines true spiritual vision: seeing the eternal, unchanging Divine presence equally in all mortal beings. While bodies perish, the Supreme Soul pervades them all, imperishable and equal. One who perceives this underlying unity does not fall into discriminating between beings as superior or inferior. This equal vision is both the fruit and the method of spiritual practice — seeing God everywhere is the highest form of meditation.";
        },
      ),
      // ── Chapter 14: Gunatraya Vibhaga Yoga ────────────────────────────────────
      (
        14,
        5,
        {
          chapterNumber = 14;
          slokaNumber = 5;
          sanskritText = "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः |\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम् ||१४-५||";
          transliteration = "sattvaṃ rajas tama iti guṇāḥ prakṛti-sambhavāḥ |\nnibadhnanti mahā-bāho dehe dehinam avyayam ||14-5||";
          meanings = {
            english = "Material nature consists of three modes — goodness, passion and ignorance. When the eternal living entity comes in contact with nature, he becomes conditioned by these modes.";
            hindi = "हे महाबाहो! सत्त्व, रज और तम — ये प्रकृति से उत्पन्न तीन गुण हैं जो अव्यय जीव को शरीर में बाँधते हैं।";
            telugu = "ఓ మహాబాహో! సత్త్వ, రజస్, తమస్ — ఇవి ప్రకృతి నుండి పుట్టిన మూడు గుణాలు. ఇవి అవ్యయమైన జీవుడిని శరీరంలో బంధిస్తాయి.";
            sanskrit = "हे महाबाहो! सत्त्वम्, रजः, तमः इति — प्रकृतिसम्भवाः गुणाः देहे अव्ययं देहिनं निबध्नन्ति।";
          };
          explanation = "Krishna introduces the three fundamental qualities (gunas) of material nature: Sattva (goodness, clarity, harmony), Rajas (passion, activity, desire), and Tamas (ignorance, inertia, darkness). Every aspect of material existence is colored by combinations of these three gunas. The eternal soul, though beyond these qualities, becomes conditioned by them through its association with the body and mind. Liberation means transcending all three gunas.";
        },
      ),
      (
        14,
        26,
        {
          chapterNumber = 14;
          slokaNumber = 26;
          sanskritText = "मां च योऽव्यभिचारेण भक्तियोगेन सेवते |\nस गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते ||१४-२६||";
          transliteration = "māṃ ca yo 'vyabhicāreṇa bhakti-yogena sevate |\nsa guṇān samatītyaitān brahma-bhūyāya kalpate ||14-26||";
          meanings = {
            english = "One who engages in full devotional service, unfailing in all circumstances, at once transcends the modes of material nature and thus comes to the level of Brahman.";
            hindi = "जो अव्यभिचारी भक्तियोग से मेरी सेवा करता है, वह इन तीनों गुणों को पार करके ब्रह्म को प्राप्त होने के योग्य हो जाता है।";
            telugu = "అవ్యభిచారంగా భక్తియోగంతో నన్ను సేవించేవాడు ఈ మూడు గుణాలను దాటి బ్రహ్మభూయానికి అర్హుడవుతాడు.";
            sanskrit = "यः माम् अव्यभिचारेण भक्तियोगेन सेवते — सः एतान् गुणान् समतीत्य ब्रह्मभूयाय कल्पते।";
          };
          explanation = "After extensively describing how the three gunas bind the soul, Krishna reveals the liberating path: unwavering devotional service (bhakti yoga). One who serves the Divine without wavering — regardless of what gunas are active in any given moment — transcends all three gunas and becomes qualified to realize Brahman. Bhakti is thus presented as the key that unlocks freedom from material conditioning.";
        },
      ),
      // ── Chapter 15: Purushottama Yoga ─────────────────────────────────────────
      (
        15,
        15,
        {
          chapterNumber = 15;
          slokaNumber = 15;
          sanskritText = "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ||१५-१५||";
          transliteration = "sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ||15-15||";
          meanings = {
            english = "I am seated in everyone's heart, and from Me come remembrance, knowledge and forgetfulness. By all the Vedas, I am to be known. Indeed, I am the compiler of Vedanta, and I am the knower of the Vedas.";
            hindi = "मैं सबके हृदय में स्थित हूँ और मुझसे ही स्मृति, ज्ञान और विस्मरण होता है। सभी वेदों से मैं ही जानने योग्य हूँ। मैं ही वेदान्त का रचयिता और वेदों का जाननेवाला हूँ।";
            telugu = "నేను అందరి హృదయంలో ఉన్నాను, నా నుండే స్మృతి, జ్ఞానం మరియు మరుపు కలుగుతున్నాయి. అన్ని వేదాల ద్వారా నేనే తెలుసుకోదగినవాడిని. నేనే వేదాంత కర్తను, వేదవేత్తను.";
            sanskrit = "सर्वस्य अहम् हृदि सन्निविष्टः। मत्तः स्मृतिः, ज्ञानम्, अपोहनं च। सर्वैः वेदैः अहम् एव वेद्यः। वेदान्तकृत्, वेदवित् च अहम् एव।";
          };
          explanation = "Krishna reveals His all-pervading presence: He dwells in every heart, and all cognitive functions — memory, knowledge, and their loss — arise from Him. Furthermore, the entire Vedic tradition points to Him as its ultimate subject and goal. He is both the source of all spiritual knowledge (Vedanta) and its ultimate knower. This verse affirms that all authentic spiritual knowledge, whatever its form, ultimately leads to the recognition of the Divine.";
        },
      ),
      (
        15,
        7,
        {
          chapterNumber = 15;
          slokaNumber = 7;
          sanskritText = "ममैवांशो जीवलोके जीवभूतः सनातनः |\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ||१५-७||";
          transliteration = "mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ |\nmanaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati ||15-7||";
          meanings = {
            english = "The living entities in this conditioned world are My eternal, fragmental parts. Due to conditioned life, they are struggling very hard with the six senses, which include the mind.";
            hindi = "इस जीवलोक में मेरा ही सनातन अंश जीव बना है जो प्रकृति में स्थित मन सहित छह इन्द्रियों को आकर्षित करता है।";
            telugu = "ఈ జీవలోకంలో నా నిత్య అంశమే జీవుడయ్యాడు, ప్రకృతిలో ఉన్న మనస్సుతో సహా ఆరు ఇంద్రియాలను ఆకర్షిస్తున్నాడు.";
            sanskrit = "जीवलोके जीवभूतः सनातनः मम एव अंशः। प्रकृतिस्थानि मनःषष्ठानि इन्द्रियाणि कर्षति।";
          };
          explanation = "This verse reveals a profound theological truth: every individual soul (jiva) is an eternal fragment (amsha) of the Supreme. We are not separate from the Divine — we are sparks of that infinite fire. However, in our conditioned state, we struggle with the six senses (the five sensory organs plus the mind), which pull our attention outward toward the material world. Liberation is recognizing our divine origin and returning to conscious union with the Supreme.";
        },
      ),
      // ── Chapter 16: Daivasura Sampad Vibhaga Yoga ─────────────────────────────
      (
        16,
        1,
        {
          chapterNumber = 16;
          slokaNumber = 1;
          sanskritText = "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः |\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ||१६-१||";
          transliteration = "abhayaṃ sattva-saṃśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṃ damaś ca yajñaś ca svādhyāyas tapa ārjavam ||16-1||";
          meanings = {
            english = "The Supreme Personality of Godhead said: Fearlessness; purification of one's existence; cultivation of spiritual knowledge; charity; self-control; performance of sacrifice; study of the Vedas; austerity; simplicity...";
            hindi = "श्रीभगवान बोले: अभय, अन्तःकरण की शुद्धि, ज्ञान-योग में स्थिति, दान, इन्द्रियों का दमन, यज्ञ, स्वाध्याय, तप, सरलता...";
            telugu = "శ్రీ భగవానుడు అన్నాడు: అభయం, సత్త్వశుద్ధి, జ్ఞానయోగస్థితి, దానం, దమం, యజ్ఞం, స్వాధ్యాయం, తపస్సు, ఆర్జవం...";
            sanskrit = "श्रीभगवान् उवाच: अभयम्, सत्त्वसंशुद्धिः, ज्ञानयोगव्यवस्थितिः, दानम्, दमः, यज्ञः, स्वाध्यायः, तपः, आर्जवम्...";
          };
          explanation = "Chapter 16 opens with Krishna listing the divine qualities that lead to liberation. This first verse alone contains a remarkable catalog of virtues: fearlessness (the foundation of all spiritual practice), purity of heart, steadiness in spiritual knowledge, generosity, self-control, sacrifice, scriptural study, austerity, and straightforwardness. Together, verses 16:1-3 list twenty-six divine qualities that elevate the soul.";
        },
      ),
      (
        16,
        21,
        {
          chapterNumber = 16;
          slokaNumber = 21;
          sanskritText = "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ||१६-२१||";
          transliteration = "tri-vidhaṃ narakasyedaṃ dvāraṃ nāśanam ātmanaḥ |\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṃ tyajet ||16-21||";
          meanings = {
            english = "There are three gates leading to hell — lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.";
            hindi = "लोभ, क्रोध और लालच — ये तीन नरक के द्वार आत्मा को नाश करने वाले हैं। इसलिए इन तीनों को त्यागना चाहिए।";
            telugu = "కామం, క్రోధం మరియు లోభం — ఇవి నరకానికి మూడు ద్వారాలు, ఆత్మను నాశనం చేసేవి. అందువల్ల ఈ మూడింటిని విడిచిపెట్టాలి.";
            sanskrit = "काम-क्रोध-लोभाः — नरकस्य त्रिविधं द्वारम् आत्मनः नाशनम्। तस्मात् एतत् त्रयं त्यजेत्।";
          };
          explanation = "Krishna identifies the three greatest spiritual enemies: Kama (lust/desire), Krodha (anger), and Lobha (greed). These three are called the three gates to hell because they systematically destroy the soul's capacity for higher awareness and righteous living. Desire leads to greed; when desire is frustrated, it becomes anger; and anger destroys discrimination and wisdom. Renouncing these three is essential for spiritual progress.";
        },
      ),
      // ── Chapter 17: Shraddhatraya Vibhaga Yoga ────────────────────────────────
      (
        17,
        3,
        {
          chapterNumber = 17;
          slokaNumber = 3;
          sanskritText = "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ||१७-३||";
          transliteration = "sattvānurūpā sarvasya śraddhā bhavati bhārata |\nśraddhā-mayo 'yaṃ puruṣo yo yac-chraddhaḥ sa eva saḥ ||17-3||";
          meanings = {
            english = "O son of Bharata, according to one's existence under the various modes of nature, one evolves a particular kind of faith. The living being is said to be of a particular faith according to the modes he has acquired.";
            hindi = "हे भारत! सभी की श्रद्धा उनके स्वभाव (सत्त्व) के अनुरूप होती है। यह पुरुष श्रद्धामय है — जो जैसी श्रद्धा रखता है, वह वैसा ही है।";
            telugu = "ఓ భారతా! ప్రతి ఒక్కరి శ్రద్ధ వారి సత్త్వానికి అనుగుణంగా ఉంటుంది. ఈ మనిషి శ్రద్ధామయుడు — ఎవడు ఏ శ్రద్ధ కలిగి ఉంటాడో, అతడు అదే.";
            sanskrit = "हे भारत! सर्वस्य श्रद्धा सत्त्वानुरूपा भवति। अयं पुरुषः श्रद्धामयः — यः यच्छ्रद्धः, सः एव सः।";
          };
          explanation = "Krishna establishes a profound psychological principle: a person's faith (shraddha) shapes their entire identity and worldview. 'You are what your faith is' — this simple formula reveals that our deepest beliefs and convictions determine the quality of our consciousness and actions. Since faith follows the dominant guna in one's nature, spiritual evolution involves purifying one's nature to develop sattvic (pure) faith that leads toward liberation.";
        },
      ),
      (
        17,
        20,
        {
          chapterNumber = 17;
          slokaNumber = 20;
          sanskritText = "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे |\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ||१७-२०||";
          transliteration = "dātavyam iti yad dānaṃ dīyate 'nupakāriṇe |\ndeśe kāle ca pātre ca tad dānaṃ sāttvikaṃ smṛtam ||17-20||";
          meanings = {
            english = "Charity given out of duty, without expectation of return, at the proper time and place, and to a worthy person is considered to be in the mode of goodness.";
            hindi = "जो दान 'देना उचित है' — ऐसे भाव से, बिना प्रतिदान की आशा के, उचित देश, काल और पात्र को दिया जाए — वह सात्त्विक दान कहा जाता है।";
            telugu = "'ఇవ్వడం ధర్మం' అనే భావంతో, ప్రతిఫలం ఆశించకుండా, సరైన స్థలం, కాలం మరియు పాత్రకు చేసే దానం సాత్త్విక దానం అని చెప్పబడుతుంది.";
            sanskrit = "यत् दानम् 'दातव्यम्' इति अनुपकारिणे देशे काले च पात्रे च दीयते — तत् सात्त्विकं दानं स्मृतम्।";
          };
          explanation = "Krishna explains the highest form of charity: given with a sense of duty ('it ought to be given'), to someone who cannot reciprocate, at the right time and place, to a deserving recipient. This is sattvic (pure) charity, given not for recognition, tax benefits, or personal gain, but as a pure offering. This principle elevates charity from a social transaction to a spiritual practice that purifies the giver.";
        },
      ),
      // ── Chapter 18: Moksha Sanyasa Yoga ───────────────────────────────────────
      (
        18,
        66,
        {
          chapterNumber = 18;
          slokaNumber = 66;
          sanskritText = "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ||१८-६६||";
          transliteration = "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja |\nahaṃ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||18-66||";
          meanings = {
            english = "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.";
            hindi = "सभी धर्मों को त्यागकर एक मेरी ही शरण में आ जा। मैं तुझे सभी पापों से मुक्त कर दूंगा — शोक मत कर।";
            telugu = "అన్ని ధర్మాలను వదలి ఒక్క నన్నే శరణు పొందు. నేను నిన్ను సర్వ పాపాల నుండి విముక్తి చేస్తాను — శోకించకు.";
            sanskrit = "सर्वधर्मान् परित्यज्य माम् एकं शरणं व्रज। अहं त्वा सर्वपापेभ्यः मोक्षयिष्यामि, मा शुचः।";
          };
          explanation = "This is the 'charama shloka' — the final, most secret, and most important teaching of the entire Gita. After explaining all paths — karma yoga, jnana yoga, bhakti yoga, raja yoga — Krishna distills everything into one supreme instruction: abandon all considerations and simply surrender to Me completely. This is the ultimate surrender (sharanagati). In return, Krishna makes His greatest promise: He will personally grant liberation from all past sins. The phrase 'do not fear' is the most loving reassurance in all scripture.";
        },
      ),
      (
        18,
        78,
        {
          chapterNumber = 18;
          slokaNumber = 78;
          sanskritText = "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः |\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ||१८-७८||";
          transliteration = "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ |\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama ||18-78||";
          meanings = {
            english = "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality.";
            hindi = "जहाँ योगेश्वर श्रीकृष्ण हैं और जहाँ धनुर्धर अर्जुन है, वहाँ श्री (सम्पत्ति), विजय, विभूति और अचल नीति है — यह मेरा मत है।";
            telugu = "యోగేశ్వరుడైన కృష్ణుడు ఉన్నచోట, ధనుర్ధరుడైన అర్జునుడు ఉన్నచోట, అక్కడ సంపద, విజయం, వైభవం మరియు అచంచలమైన నీతి ఉంటాయని నా అభిప్రాయం.";
            sanskrit = "यत्र योगेश्वरः कृष्णः, यत्र पार्थः धनुर्धरः — तत्र श्रीः, विजयः, भूतिः, ध्रुवा नीतिः — मम मतिः।";
          };
          explanation = "The Bhagavad Gita concludes with these words of Sanjaya, who has narrated the entire dialogue to the blind king Dhritarashtra. The final verse encapsulates the eternal truth: wherever the Divine (Krishna, the master of yoga) and human effort (Arjuna, the best archer — representing disciplined, skillful action) are united, there you will find prosperity, victory, power, and righteousness. This is the ultimate formula for success in any endeavor — the union of divine grace and dedicated human action.";
        },
      ),
    ];

    for ((chapter, sloka, slokaData) in data.vals()) {
      slokas.add(natPairCompare, (chapter, sloka), slokaData);
    };

    for ((chapter, sloka, slokaData) in data2.vals()) {
      slokas.add(natPairCompare, (chapter, sloka), slokaData);
    };
  };

  /// Seeds the store with initial chapter metadata (no-op if already seeded).
  public func seedChapters(chapters : List.List<Types.ChapterMeta>) {
    if (not chapters.isEmpty()) return;

    let chapterData : [Types.ChapterMeta] = [
      {
        chapterNumber = 1;
        sanskritName = "अर्जुन विषाद योग";
        englishName = "Arjuna Vishada Yoga";
        totalSlokas = 47;
        summary = "Arjuna, standing between the two armies, is overwhelmed by grief and moral confusion at the sight of his kinsmen ready for battle. He lays down his bow, unable to fight. This chapter sets the stage for Krishna's divine teachings by establishing the depth of human suffering and the need for spiritual guidance.";
      },
      {
        chapterNumber = 2;
        sanskritName = "सांख्य योग";
        englishName = "Sankhya Yoga";
        totalSlokas = 72;
        summary = "The longest chapter, where Krishna reveals the immortality of the soul, the nature of the eternal Self, and the path of Nishkama Karma (desireless action). Contains the famous verse 2:47 — 'You have a right to action but not to its fruits.' Krishna introduces the Sankhya philosophy distinguishing between the eternal Self and the temporary body.";
      },
      {
        chapterNumber = 3;
        sanskritName = "कर्म योग";
        englishName = "Karma Yoga";
        totalSlokas = 43;
        summary = "Krishna elaborates on the Yoga of Action. He explains that no one can remain inactive even for a moment, and that performing one's duties without selfish desires purifies the mind. He introduces the concept of Yajna (sacrifice) as cosmic action and explains how desire and anger are the great enemies of the soul.";
      },
      {
        chapterNumber = 4;
        sanskritName = "ज्ञान कर्म संन्यास योग";
        englishName = "Jnana Karma Sanyasa Yoga";
        totalSlokas = 42;
        summary = "Krishna reveals the eternal nature of this knowledge, passed from the sun-god to Manu to Ikshvaku. He explains his divine descents (avatars) and teaches how action combined with wisdom leads to liberation. The chapter culminates in the superiority of wisdom over all other offerings.";
      },
      {
        chapterNumber = 5;
        sanskritName = "कर्म संन्यास योग";
        englishName = "Karma Sanyasa Yoga";
        totalSlokas = 29;
        summary = "Arjuna asks whether renunciation or action is better. Krishna explains that both paths lead to the same goal, but action (Karma Yoga) is preferable for most people. The true renunciant performs actions without attachment, seeing the Self in all beings and experiencing inner peace.";
      },
      {
        chapterNumber = 6;
        sanskritName = "आत्म संयम योग";
        englishName = "Atma Sanyam Yoga";
        totalSlokas = 47;
        summary = "The Yoga of Self-Control. Krishna details the practice of meditation, including posture, breathing, and mental focus. He describes the ideal yogi and warns of the dangers of failing on the spiritual path. The chapter concludes that the yogi who meditates on the Divine is the highest of all.";
      },
      {
        chapterNumber = 7;
        sanskritName = "ज्ञान विज्ञान योग";
        englishName = "Jnana Vijnana Yoga";
        totalSlokas = 30;
        summary = "Krishna reveals that He is the ultimate reality underlying all creation. He describes His divine nature expressed through eight material elements and the superior spiritual energy. He explains the four types of people who turn to Him and the four who do not, and reveals that those who know Him fully are very rare.";
      },
      {
        chapterNumber = 8;
        sanskritName = "अक्षर ब्रह्म योग";
        englishName = "Akshara Brahma Yoga";
        totalSlokas = 28;
        summary = "The Yoga of the Imperishable Brahman. Krishna explains the nature of Brahman, karma, and the cosmic cycles of creation and destruction. He describes the paths of light and darkness after death, and reveals the secret of remembering Him at the time of death as the key to liberation.";
      },
      {
        chapterNumber = 9;
        sanskritName = "राज विद्या राज गुह्य योग";
        englishName = "Raja Vidya Raja Guhya Yoga";
        totalSlokas = 34;
        summary = "The Royal Knowledge and the Royal Secret. Krishna reveals the most confidential knowledge: He pervades all existence yet remains beyond it. He explains the difference between those who worship Him with devotion and those who worship demigods. The chapter contains the beautiful promise: 'Even a great sinner can cross the ocean of sin with the boat of knowledge.'";
      },
      {
        chapterNumber = 10;
        sanskritName = "विभूति योग";
        englishName = "Vibhuti Yoga";
        totalSlokas = 42;
        summary = "The Yoga of Divine Glories. Krishna describes His infinite divine manifestations — the chief expressions of His divine power in the universe. He is the beginning, middle, and end of all beings. This chapter is a poetic celebration of the Divine in everything great, beautiful, and powerful in existence.";
      },
      {
        chapterNumber = 11;
        sanskritName = "विश्वरूप दर्शन योग";
        englishName = "Vishwarupa Darshana Yoga";
        totalSlokas = 55;
        summary = "The Yoga of the Vision of the Universal Form. Arjuna is granted divine vision to behold Krishna's cosmic form — infinite, with countless faces, arms, and manifestations, containing all of existence within Himself. Overwhelmed, Arjuna prays for Krishna to return to His personal form. This is the climactic revelation of the Gita.";
      },
      {
        chapterNumber = 12;
        sanskritName = "भक्ति योग";
        englishName = "Bhakti Yoga";
        totalSlokas = 20;
        summary = "The Yoga of Devotion. Arjuna asks which is superior: worship of the personal God or the impersonal Brahman. Krishna says devotion to His personal form is the easier path. He describes the qualities of the ideal devotee — one who is free from hatred, who is compassionate, and who is equanimous in all circumstances.";
      },
      {
        chapterNumber = 13;
        sanskritName = "क्षेत्र क्षेत्रज्ञ विभाग योग";
        englishName = "Kshetra Kshetrajna Vibhaga Yoga";
        totalSlokas = 35;
        summary = "The Yoga of Distinguishing the Field and the Knower of the Field. Krishna explains the body (kshetra) and the soul that knows it (kshetrajna). He describes the 24 elements of material nature and the qualities that lead to wisdom. The chapter culminates in the vision of the Supreme pervading all fields.";
      },
      {
        chapterNumber = 14;
        sanskritName = "गुण त्रय विभाग योग";
        englishName = "Gunatraya Vibhaga Yoga";
        totalSlokas = 27;
        summary = "The Yoga of the Division of the Three Gunas. Krishna explains in detail the three qualities that bind the soul to the material world: Sattva (goodness), Rajas (passion), and Tamas (ignorance). He describes how each quality manifests and what happens when one transcends all three gunas, becoming truly free.";
      },
      {
        chapterNumber = 15;
        sanskritName = "पुरुषोत्तम योग";
        englishName = "Purushottama Yoga";
        totalSlokas = 20;
        summary = "The Yoga of the Supreme Person. Krishna uses the metaphor of the eternal Ashvattha tree (the banyan) to describe material existence. He explains the three aspects of existence: the perishable (kshara), the imperishable (akshara), and the Supreme (Purushottama) who transcends both. One who knows this secret knows the whole Gita.";
      },
      {
        chapterNumber = 16;
        sanskritName = "दैव असुर सम्पद्विभाग योग";
        englishName = "Daivasura Sampad Vibhaga Yoga";
        totalSlokas = 24;
        summary = "The Yoga of Divine and Demoniac Natures. Krishna distinguishes between divine qualities (fearlessness, purity, compassion, wisdom) and demoniac qualities (arrogance, cruelty, ignorance). He describes the three gates to hell: lust, anger, and greed. Those with divine qualities achieve liberation; those with demoniac qualities fall lower.";
      },
      {
        chapterNumber = 17;
        sanskritName = "श्रद्धा त्रय विभाग योग";
        englishName = "Shraddhatraya Vibhaga Yoga";
        totalSlokas = 28;
        summary = "The Yoga of the Threefold Faith. Arjuna asks about those who worship with faith but without following scriptural injunctions. Krishna explains that faith also comes in three kinds aligned with the three gunas. He describes how food, sacrifice, austerity, and charity also carry the qualities of the three gunas.";
      },
      {
        chapterNumber = 18;
        sanskritName = "मोक्ष संन्यास योग";
        englishName = "Moksha Sanyasa Yoga";
        totalSlokas = 78;
        summary = "The Yoga of Liberation through Renunciation. The final and longest chapter summarizes the entire Gita. Krishna explains the difference between Sannyasa and Tyaga, the five causes of action, the three types of knowledge and action. He culminates with the supreme secret: 'Abandon all varieties of dharma and simply surrender to Me.' Arjuna's doubt is resolved, and he chooses to fight.";
      },
    ];

    for (chapter in chapterData.vals()) {
      chapters.add(chapter);
    };
  };
};
