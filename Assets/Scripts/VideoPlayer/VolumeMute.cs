using UnityEngine;

public class VolumeMute : VideoButton
{
    [SerializeField] private bool isMute = false;

    protected override void OnPress()
    {
        if (isMute)
        {
            AudioListener.volume = Volume.Value;
            isMute = false;
        }
        else
        {
            AudioListener.volume = 0;
            isMute = true;
        }
    }
}