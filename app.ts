const express = require("express");
import { Request, Response, NextFunction } from "express";
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
import router from "./routes/router";
const multer = require('multer');

require("dotenv").config(); // per variabili d'ambiente (.env)

const app = express();

//start listening on port
app.listen(3000, () => {
  console.log("Server started on port 3000.");
});

//register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(cors());
app.use(express.static("public")); //rende i file nella cartella 'public' pubblici, utile per i css e immagini
app.use(express.urlencoded({ extended: true })); //encoding dell'url, lo rende 'leggibile'
app.use(morgan("dev")); //format dell'output del log delle richieste
app.use(bodyParser.json()); // Per passare dati dal frontend con axios.post
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.path = req.path;
  next(); //serve per passare la richieste al prossimo route senza perdere lo stato della richiesta
});

// Add headers before the routes are defined
app.use(function (req: Request, res: Response, next: NextFunction) {
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "false");
  // Pass to next layer of middleware
  next();
});
/*

// version
app.get("/version", (req: Request, res: Response) => {
  res.send("1.0.0");
});
*/
//pass file upload middleware
const storage = multer.memoryStorage();
const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req: any, res: any) => {
  console.log('multer called');
  console.log("Altri campi:", req.body);
  // Access the file buffer
  const fileBuffer = req.file.buffer;

  // Process the file (e.g., parse, send to another service, etc.)
  console.log(`Received file: ${req.file.originalname}`);
  console.log(`File size: ${req.file.size} bytes`);

  res.send(` NON DISCLOSURE AGREEMENT
This Nondisclosure Agreement (this "Agreement") is entered into as of _________________, 202__ (the “Effective Date”)  between _______________________________ having a place of business at ____________________________________(“Supplier”) and its Affiliates, and _________________________________having a place of business at __________________________________________________   (“Buyer” or  “Buyer”) (each a “Party and collectively the “Parties”), in connection with discussions regarding one or more  transactions or potential future transactions involving the purchase and/or  sale of goods and/or services (the “Transaction”).  Supplier wishes to enter this Agreement with Buyer to allow Supplier and any of its Affiliates to hold discussions regarding a Transaction with Buyer.  In connection with such Transaction it may be necessary for Buyer and/or its Affiliates (as to information disclosed by it, the “Discloser”) to disclose to Supplier and/or its Affiliates (as to information received by it, the “Recipient”) certain confidential and proprietary information.  
1.  “Confidential Information” as used in this Agreement shall mean all such information that is or has been disclosed by  or on behalf of Buyer or its Affiliates to Supplier or its Affiliates or observed by Supplier or its Affiliates during site visits, in furtherance of the Transaction that Buyer or its Affiliate disclosing such information considers confidential including without limitation: drawings, specifications, sample materials, formulations, product plans, processes, manufacturing information, site information, business information, financial information, information of third parties for which Buyer or its Affiliate has an obligation of confidentiality, information related to regulatory performance, regulatory applications and permits and the like; the existence of the Transaction and any results or data therefrom and the status and terms of any substantive discussions held between the Parties; and any other nonpublic, sensitive information Supplier should reasonably understand to be a trade secret or otherwise confidential shall also constitute Confidential Information hereunder.  Confidential Information also includes, but is not limited to, personal data as defined in this Agreement or by applicable law, whichever is broader, and personal data shall not be required to be designated as Confidential to be treated as Confidential Information under this Agreement.  As used in this Agreement, “personal data” means any information relating:  (i) to an identified; or (ii) to a directly or indirectly identifiable, natural person.  As used in this Agreement, an “Affiliate” with respect to a Party means any entity (including without limitation any individual, corporation, company, partnership, limited liability company or group) that directly or indirectly controls, is controlled by, or is under direct or indirect common control with such Party and is not a Buyer competitor.
2.  Recipient shall:  (i) maintain such Confidential Information in strict confidence by using the same degree of care Recipient uses  in safeguarding its own confidential information of like nature, but not less than a reasonable degree of care; (ii) use the Confidential Information only to the extent required to facilitate the Transaction; (iii) disclose Confidential Information only to those of its and its Affiliates officers, directors, employees, agents, advisors, representatives, consultants, suppliers, service providers, and/or subcontractors who have a need to know (collectively, “Authorized Parties”), solely to the extent necessary to assist Recipient in evaluating and conducting the Transaction and then only after each such person has been advised of the obligations contained in this Agreement and such person is bound by them or by terms at least as restrictive; (iv) not disclose to persons (other than to the Authorized Parties in clause (iii) above) that the Confidential Information has been made available, and that the Parties or respective Affiliates are evaluating a Transaction or that the Parties or respective Affiliates have had or are having discussions or negotiations with respect thereto.  Supplier further agrees that its and its Affiliates’ respective Authorized Parties will be advised of the confidential nature of the Confidential Information, provided a copy of this Agreement and directed to abide by its terms. Supplier agrees to ensure its Affiliates’ compliance with this Agreement and to be responsible for any breach of this Agreement by it, its Affiliates, and their respective Authorized Parties.  The Parties acknowledge that money damages would not be a sufficient remedy for any breach of this Agreement.  Accordingly, in the event of any such breach, in addition to any other remedies at law or in equity that Buyer or its Affiliates may have, it shall be entitled to seek equitable relief, including injunctive relief or specific performance or both.  
Obligations regarding Confidential Information shall, with respect to each disclosure of Confidential Information hereunder, continue for five (5) years from the date of disclosure, provided, however, that such obligations related to Confidential Information constituting a trade secret of Buyer or of a Buyer Affiliate, including without limitation all product formulary information whether or not marked as trade secret, will continue so long as such information remains subject to trade secret protection pursuant to applicable law.  
3.  Not considered Confidential Information is that information which:  
(i) is known to Recipient prior to the disclosure thereof by Discloser; (ii) is obtained, whether directly or indirectly, by Recipient from a source other than Discloser without violation of a legal obligation by any entity; or (iii) is or becomes public knowledge without violation of a legal obligation by any entity. In the event Recipient is required by law to disclose Discloser’s confidential information, Recipient shall (a) promptly notify Discloser; (b) where feasible, provide Discloser the opportunity to challenge the disclosure at Buyer’s cost; (c) limit the disclosure to that information legally required to be disclosed; and (d) use commercially reasonable efforts to obtain confidential treatment of all disclosed information.  Supplier and its Affiliates are on notice that the Confidential Information may include valuable trade secrets of Buyer or of a Buyer Affiliate.
4.  If either Party or their respective Affiliates decide  not to enter into a further agreement or business relationship, it will promptly inform the other Party of that decision.  Buyer or its Affiliates may elect at any time by notice to Recipient to terminate further access to and Recipients review of the Confidential Information.  In any such case or upon any other termination of this Agreement, Recipient will immediately: (i) return all Confidential Information disclosed to it or securely destroy the same, with such destruction to be certified by Supplier, provided that (a) Recipient may retain a single archival copy to the extent required by applicable law or for performing any obligations or exercising any rights under this Agreement that may survive its expiration or termination, and (b) such obligations to delete or destroy shall not apply to computer records and files which have been created pursuant to general automatic electronic archiving or information technology (IT) back-up procedures and which are not readily accessible or used for any purpose other than archiving or back-up, in each case subject to the restrictions set forth in this Agreement.  No such termination of the Agreement or return or destruction of the Confidential Information will affect the confidentiality obligations of Supplier, its Affiliates, and their respective Authorized Parties, all of which will continue in effect as provided in this Agreement.
5.  Buyer and its Affiliates shall retain ownership of all its Confidential Information and intellectual property rights therein and in other information disclosed hereunder. Buyer shall own exclusively all rights in works created in or resulting from discussions with Supplier or its Affiliates that are based on or using the Confidential Information, and Supplier and its Affiliates hereby assigns such work and intellectual property rights therein to Buyer. Supplier understands that Buyer may use the Confidential Information in support of the Evaluation for the benefit of Buyer’s Affiliates.
6.  This Agreement contains the entire understanding between the Parties relating to the Transaction, and supersedes all prior and collateral communication, reports and understandings between the Parties relating thereto.  This Agreement is not intended as a teaming, joint venture or other such arrangement.  No change, modification or addition to or waiver of any provision of this Agreement shall be binding unless in writing and signed by authorized representatives of both Parties.  Except as provided herein, nothing shall restrict either Party’s right to take whatever future actions such Party unilaterally determines to be in its best interests, including the right to discontinue discussions at any time or to undertake similar discussions or to enter into agreements or relationships with third parties covering subjects related to the matters covered herein.  All provisions of this Agreement are severable, and if any provision or part thereof is deemed invalid or otherwise unenforceable, then such term shall be construed to reflect the closest lawful interpretation of the Parties’ original intent, and the remaining provisions of this Agreement shall remain valid, enforceable and binding.  This Agreement may be executed in counterparts, each of which shall be one and the same document. An electronic, PDF, facsimile, or e-mailed copy of the execution page hereof will be deemed a valid original signature. Recipient shall notify Discloser immediately upon discovery of any loss, unauthorized disclosure or use of the Confidential Information or any other breach of this Agreement by Supplier, its Affiliates, or its or their Authorized Parties.  In any such event, Recipient shall help Discloser in every reasonable way to regain possession of the Confidential Information and shall prevent any further unauthorized disclosure or use. Supplier shall not assign, transfer or transmit, any of its rights and obligations under this Agreement without Buyer’s prior, written consent. Subject to the foregoing, this Agreement shall be binding upon and inure to the benefit of the parties, their respective successors and permitted assigns. Buyer shall be entitled to assign and transfer any and all rights and obligations arising under this Agreement, to any other Buyer Affiliate.  Except as stated herein, nothing in this Agreement is intended to confer any benefit to any third party or any right to enforce any term of this Agreement.  Any failure by a Party hereto to enforce the other Party’s strict performance of any provision of this Agreement will not constitute a waiver of that Party’s right to subsequently enforce such provision or any other provision of this Agreement.
7.  The final properties of the sample materials may not have been determined, nor their suitability for any particular application established. Any Material Safety Data Sheets furnished with the sample materials describe the workplace safety aspects of using and disposing of the sample materials. Caution must be applied during evaluation of the sample materials, since all possible workplace considerations may not be known at the time of sampling. Except for testing services specifically requested by Buyer as part of the Transaction, Supplier and its Affiliates will not test or analyze the sample materials for their chemical composition, physical characteristics, or, in the case of equipment, internal structure or operation, nor will Supplier and its Affiliates permit third parties to undertake chemical or other analysis of the sample materials. A copy of any test results and data obtained on the sample materials shall be provided by Supplier and its Affiliates to Buyer and all such results and data shall be treated as Confidential Information of Buyer.
8. Buyer and Supplier each agree to take such measures as may be necessary to ensure that the disclosure of Confidential Information complies with any export control laws which may govern such disclosure.  Supplier represents and warrants that no technical data it receives in conjunction with the Confidential Information that is subject to the export control laws of any country shall be exported from said country or re exported from any other country without first complying with all export control laws and regulations of the applicable country, including but not limited to the United States of America, including without limitation the requirement for obtaining any export license, if applicable.  Supplier shall indemnify and hold Buyer harmless from all claims, demands, damages, costs, fines, penalties, attorney’s fees and all other expenses arising from its, its Affiliates, and their Authorized Parties failure to comply with this clause and/or applicable export control laws and regulations.
9.  This Agreement shall be governed by and interpreted in accordance with the laws of New York, excluding its conflict of laws rules. If Supplier is a permanent resident of a country other than the U.S., or is a corporation, partnership or other entity existing under the laws of any country other than the U.S., and Supplier and Buyer have a controversy, dispute or difference arising out of this Agreement (“Dispute”), the Parties agree to submit any such Dispute to settlement proceedings under the Alternative Dispute Resolution Rules (the “ADR Rules”) of the International Chamber of Commerce (the “ICC”). If the Dispute has not been settled pursuant to the ADR Rules within forty-five (45) days following the filing of a request for ADR or within such other period as the Parties may agree in writing, such Dispute shall be finally settled under the Rules of Arbitration and Conciliation of the ICC (the “ICC Rules”) by one or three arbitrators appointed in accordance with such ICC Rules. The place for arbitration shall be Paris, France, and proceedings shall be conducted in English. The award shall be final and binding on both Buyer and Supplier, and the Parties hereby waive the right of appeal to any court for amendment or modification of the arbitrators’ award. 
10. The term of this Agreement shall be five (5) years from the date hereof and shall automatically renew annually unless earlier terminated in writing by a Party hereto. For the avoidance of doubt as to Confidential Information disclosed under this Agreement, the obligations of Section 2 shall survive termination of this Agreement.

IN WITNESS THEREOF, the Parties hereto have caused this Agreement to be executed by their respective authorized representatives on the dates ascribed below to be effective as of the Effective Date of this Agreement. 

For Supplier and Supplier Affiliates:	For Buyer:
Entity Name: _____________________________________	Entity Name:   ____________________________________
Signature:  		Signature:  	
Print or type Name:  			Print or type Name:  		
Title:  			Title:  		
Date:  			Date:  		
`);
});

app.use("/router", router);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response) {
  res.status(404).send("Resource not found, check if the URL is correct");
});
