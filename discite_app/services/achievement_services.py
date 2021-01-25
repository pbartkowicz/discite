from discite_app.models import Achievement, UserAchievement


def update_user_solve_achievements(test_result, user):
    current_user_achievements = user.userachievement_set.all()
    # SOLVE ONE TEST ACHIEVEMENT
    solve_test_achievement = Achievement.objects.get(key='SOLVE_TEST')
    if not any(solve_test_achievement.id == user_achievement.achievement_id
               for user_achievement in current_user_achievements):
        UserAchievement.objects.create(user=user, achievement=solve_test_achievement)


def update_user_create_achievements(user):
    current_user_achievements = user.userachievement_set.all()
    # CREATE ONE TEST ACHIEVEMENT
    create_test_achievement = Achievement.objects.get(key='CREATE_TEST')
    if not any(create_test_achievement.id == user_achievement.achievement_id
               for user_achievement in current_user_achievements):
        UserAchievement.objects.create(user=user, achievement=create_test_achievement)


def get_achievements_summary(user):
    all_achievements = Achievement.objects.all()
    user_achievements = user.userachievement_set.all()

    result = []
    for achievement in all_achievements:
        acquired_at = get_user_achievement_date(achievement.id, user_achievements)
        if acquired_at is not None:
            acquired_at = acquired_at.strftime('%d/%m/%Y %H:%M')
        result.append({
            'id': achievement.id,
            'achievement': achievement.description,
            'acquired_at': acquired_at
        })
    return result


def get_user_achievement_date(achievement_id, user_achievements):
    for user_achievement in user_achievements:
        if achievement_id == user_achievement.achievement_id:
            return user_achievement.acquired_at
    return None
