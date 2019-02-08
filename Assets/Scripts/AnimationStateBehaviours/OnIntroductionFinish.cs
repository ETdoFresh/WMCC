using UnityEngine;

public class OnIntroductionFinish : StateMachineBehaviour
{
    public string nextSceneName = "MainMenu";

    public override void OnStateExit(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
    {
        base.OnStateExit(animator, stateInfo, layerIndex);
        SceneManager.FadeToScene(nextSceneName);
    }
}
