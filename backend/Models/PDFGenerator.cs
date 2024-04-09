public class PDFGenerator
{
    //receive configuration information so we can use senderEmailAddress and senderPassword
     private readonly APIDbContext _dbContext; 

    public PDFGenerator(APIDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    //method that sends email and takes in the recipient, subject, and body
    public string GenerateHTML()
    {

        var review = default(Review);
        //find the current review for the employee
        review = _dbContext.Reviews.FirstOrDefault(review => review.EmployeeHID == Globals.SelectedEmployeeHID && review.Status != "Finalized");
        
        //variable to hold employee info that will be put in fields in the HTML before it is converted to a PDF
        var employee_name = review.EmployeeName;
        var today_date = DateTime.Today.Date.ToString("MM/dd/yyyy");
        var manager_name = review.ManagerName;

        // get a list of all the questions for the review
        var questions = _dbContext.Questions.ToList();

        //bounds for the questions we will loop through to find responses
        int first_response_question = 1;
        int last_response_question = 6; 

        // get all the responses that the employee submitted for questions 1 through 6. order by the questionID in ascending order. These are text response questions
        var responses_from_employee = _dbContext.Responses.Where(response => response.QuestionID >= first_response_question && response.QuestionID <= last_response_question)
        .Where(response => response.HID == Globals.SelectedEmployeeHID)
        .OrderBy(response => response.QuestionID)
        .ToList();

        // do the same as above but for the responses submitted by the manager. order by the questionID in ascending order
        var responses_from_manager = _dbContext.Responses.Where(response => response.QuestionID >= first_response_question && response.QuestionID <= last_response_question)
        .Where(response => response.HID == review.ManagerHID)
        .OrderBy(response => response.QuestionID)
        .ToList();

        // variable to hold the number of questions that have text responses. we will use this in a loop
        var number_of_text_response_questions = 6;

        // make a list of strings for both employee and manager text responses
        var employee_responses = new List<string>();
        var manager_responses = new List<string>();

        // Initialize these with empty strings
        for (int i = 0; i < number_of_text_response_questions; i++)
        {
            employee_responses.Add("");
            manager_responses.Add("");
        }


        // j is used for the index in the employee_responses and manager_responses list where we will add responses
        int j = 0; 


        // for questions 1-6 (they have text responses, not ratings)
        for (int i = first_response_question; i <= last_response_question; i++)
        {
            // Find employee response corresponding to current question
            var employee_response = responses_from_employee.FirstOrDefault(response => response.QuestionID == i);
            
            // if there is a response associated with this question, assign it to the correct index of the employee_responses list
            if (employee_response != null)
            {
                employee_responses[j] = employee_response.Content;
            }

            // Find manager response corresponding to current question
            var manager_response = responses_from_manager.FirstOrDefault(response => response.QuestionID == i);
            
            // if there is a response associated with this question, assign it to the correct index of the manager_responses list
            if (manager_response != null)
            {
                manager_responses[j] = manager_response.Content;
            }

            //increment j so we can add ratings to the next index of the employee_ratings and manager_ratings lists in the next iteration
            j++;
        }


        //the same process as above is done but with ratings below. Ratings questions are questions 7-14

        //bounds for the questions we will loop through to find ratings
        int first_rating_question = 7;
        int last_rating_question = 14; 

        var ratings_from_employee = _dbContext.Ratings.Where(rating => rating.QuestionID >= first_rating_question && rating.QuestionID <= last_rating_question)
        .Where(rating => rating.HID == Globals.SelectedEmployeeHID)
        .OrderBy(rating => rating.QuestionID)
        .ToList();

        var ratings_from_manager = _dbContext.Ratings.Where(rating => rating.QuestionID >= first_rating_question && rating.QuestionID <= last_rating_question)
        .Where(rating => rating.HID == review.ManagerHID)
        .OrderBy(rating => rating.QuestionID)
        .ToList();

        // variable for loop below just for clarity
        var number_of_rating_questions = 8;

        // list of integers for ratings for both employees and managers
        var employee_ratings = new List<int>();
        var manager_ratings = new List<int>();


        // Initialize with 0s
        for (int i = 0; i < number_of_rating_questions; i++)
        {
            employee_ratings.Add(0);
            manager_ratings.Add(0);
        }


        
        
        // k is used for the index in the employee_ratings and manager_ratings list where we will add ratings
        int k = 0; 


        // for questions 7-14 (they have ratings, not text responses)
        for (int i = first_rating_question; i <= last_rating_question; i++)
        {
             // Find employee rating corresponding to current question
            var employee_rating = ratings_from_employee.FirstOrDefault(rating => rating.QuestionID == i);
            
            // if there is a rating associated with this question, assign it to the correct index of the employee_ratings list
            if (employee_rating != null)
            {
                employee_ratings[k] = employee_rating.Value;
            }

            // Find manager rating corresponding to current question
            var manager_rating = ratings_from_manager.FirstOrDefault(rating => rating.QuestionID == i);
            
            // if there is a rating associated with this question, assign it to the correct index of the manager_ratings list
            if (manager_rating != null)
            {
                manager_ratings[k] = manager_rating.Value;
            }

            //increment j so we can add ratings to the next index of the employee_ratings and manager_ratings lists in the next iteration
            k++;
        }



        return $@"
            <!DOCTYPE html>
            <html>


            <head>
                <title>North Wind Solutions Annual Performance Review</title>
                <style>
                    h1 {{
                        text-align: center;
                    }}
                    h2 {{
                        text-align: center;
                    }}
                    body {{
                        font-family: Arial, sans-serif;
                        font-size: 14pt;
                    }}
                    .styled-table {{
                    width: 100%;
                    border-collapse: collapse;
                    }}
                    .styled-table th, .styled-table td {{
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }}
                    .centered-cell {{
                    text-align: center;
                    }}
                    .half-width {{
                    width: 50%;
                    }}
                    .quarter-width {{
                    width: 25%;
                    }}
                    .third-width {{
                    width: 33%;
                    }}
                    .signature-row {{
                    margin-bottom: 20px; 
                    }}

                </style>
            </head>


            <body>
                <h1>North Wind Solutions Annual Performance Review</h1>


                <table class='styled-table'>
                <tr>
                    <td><div class='centered-cell'><b>Employee Info</b></div></td>
                </tr>
                </table>


                <table class='styled-table'>
                <tr>
                    <td><b>Employee Name</b></td>
                    <td>{employee_name}</td>
                    <td><b>Department</b></td>
                    <td></td>
                </tr>
                <tr>
                    <td><b>Position Held</b></td>
                    <td></td>
                    <td><b>Manager</b></td>
                    <td>{manager_name}</td>
                </tr>
                <tr>
                    <td><b>Last Review Date</b></td>
                    <td></td>
                    <td><b>Today's Date</b></td>
                    <td>{today_date}</td>
                </tr>
                </table>


                <table class='styled-table'>
                    <tr>
                        <td><div class='centered-cell'><b>Current Responsibilites</b></div></td>
                    </tr>
                    <tr>
                        <td><div class='centered-cell'><i>{questions[0].Content}</i></div></td>
                    </tr>
                </table>
                <table class='styled-table'>
                    <tr>
                        <td class='half-width'><b>Employee Comments:</b> {employee_responses[0]}</td>
                        <td class='half-width'><b>Manager Feedback:</b> {manager_responses[0]}</td>
                    </tr>

                </table>


                <table class='styled-table'>
                    <tr>
                        <td><div class='centered-cell'><b>Performance Assessment</b></div></td>
                    </tr>
                    <tr>
                        <td><div class='centered-cell'><i>{questions[1].Content}</i></div></td>
                    </tr>
                </table>
                <table class='styled-table'>
                    <tr>
                        <td class='half-width'><b>Employee Comments:</b> {employee_responses[1]}</td>
                        <td class='half-width'><b>Manager Feedback:</b> {manager_responses[1]}</td>
                    </tr>
                </table>


                <table class='styled-table'>
                    <tr>
                        <td><div class='centered-cell'><i>{questions[2].Content}</i></div></td>
                    </tr>
                </table>
                <table class='styled-table'>
                    <tr>
                        <td class='half-width'><b>Employee Comments:</b> {employee_responses[2]}</td>
                        <td class='half-width'><b>Manager Feedback:</b> {manager_responses[2]}</td>
                    </tr>
                </table>


                <table class='styled-table'>
                    <tr>
                        <td><div class='centered-cell'><i>{questions[3].Content}</i></div></td>
                    </tr>
                </table>
                <table class='styled-table'>
                    <tr>
                        <td class='half-width'><b>Employee Comments:</b> {employee_responses[3]}</td>
                        <td class='half-width'><b>Manager Feedback:</b> {manager_responses[3]}</td>
                    </tr>
                </table>


                <table class='styled-table'>
                    <tr>
                        <td><div class='centered-cell'><i>{questions[4].Content}</i></div></td>
                    </tr>
                </table>
                <table class='styled-table'>
                    <tr>
                        <td class='half-width'><b>Employee Comments:</b> {employee_responses[4]}</td>
                        <td class='half-width'><b>Manager Feedback:</b> {manager_responses[4]}</td>
                    </tr>
                </table>


                <table class='styled-table'>
                    <tr>
                        <td><div class='centered-cell'><i>{questions[5].Content}</i></div></td>
                    </tr>
                </table>
                <table class='styled-table'>
                    <tr>
                        <td class='half-width'><b>Employee Comments:</b> {employee_responses[5]}</td>
                        <td class='half-width'><b>Manager Feedback:</b> {manager_responses[5]}</td>
                    </tr>
                </table>


                <table class='styled-table signature-row'>
                    <tr>
                        <td class='quarter-width'><b>Employee Signature</b></td>
                        <td class='quarter-width'>{review.EmployeeSignature}</td>
                        <td class='quarter-width'><b>Manager Signature</b></td>
                        <td class='quarter-width'>{review.ManagerSignature}</td>
                    </tr>
                </table>


                <div>
                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><b>Skill Area</b></td>
                        <td class='third-width'><b>Employee Rating</b></td>
                        <td class='third-width'><b>Manager Rating</b></td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[6].Content}</i></td>
                        <td class='third-width'>{employee_ratings[0]}</td>
                        <td class='third-width'>{manager_ratings[0]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[7].Content}</i></td>
                        <td class='third-width'>{employee_ratings[1]}</td>
                        <td class='third-width'>{manager_ratings[1]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[8].Content}</i></td>
                        <td class='third-width'>{employee_ratings[2]}</td>
                        <td class='third-width'>{manager_ratings[2]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[9].Content}</i></td>
                        <td class='third-width'>{employee_ratings[3]}</td>
                        <td class='third-width'>{manager_ratings[3]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[10].Content}</i></td>
                        <td class='third-width'>{employee_ratings[4]}</td>
                        <td class='third-width'>{manager_ratings[4]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[11].Content}</i></td>
                        <td class='third-width'>{employee_ratings[5]}</td>
                        <td class='third-width'>{manager_ratings[5]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[12].Content}</i></td>
                        <td class='third-width'>{employee_ratings[6]}</td>
                        <td class='third-width'>{manager_ratings[6]}</td>
                    </tr>
                    </table>

                    <table class='styled-table'>
                    <tr>
                        <td class='third-width'><i>{questions[13].Content}</i></td>
                        <td class='third-width'>{employee_ratings[7]}</td>
                        <td class='third-width'>{manager_ratings[7]}</td>
                    </tr>
                    </table>
                </div>

            </body>
            </html>";
    }
}