<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Total Number of Surveys
        $total = Survey::query()->where('user_id', $user->id)->count();

        // Latest Survey
        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        // Total Number of Answer
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'survey_id')
            ->where('surveys.user_id', $user->id)
            ->count();
            
        // Latest 5 answer
        $latestAnswer = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'survey_id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('survey_answers.end_date', 'desc')
            ->limit(5)
            ->getModels('survey_answers.*');
            

        return [
            'totalSurveys' => $total,
            'latestSurveys' => $latest ? new SurveyResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswer),
        ];
    }
}
