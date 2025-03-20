using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace SignalRChatApp
{
    public sealed class ChatHub : Hub
    {
        private static readonly Dictionary<string, string> ConnectedUsers = new Dictionary<string, string>();

        public override async Task OnConnectedAsync()
        {
            string userName = Context.GetHttpContext().Request.Query["user"]; 
            
            if (!ConnectedUsers.ContainsKey(Context.ConnectionId)) 
            { 
                ConnectedUsers.Add(Context.ConnectionId, userName); 
            }

            await UpdateUserList();
            await Clients.All.SendAsync("ReceiveMessage", "ChatHub", $"{userName} has joined");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string userName = ConnectedUsers[Context.ConnectionId];

            if (ConnectedUsers.ContainsKey(Context.ConnectionId)) 
            { 
                ConnectedUsers.Remove(Context.ConnectionId); 
            }

            await Clients.All.SendAsync("ReceiveMessage", "ChatHub", $"{userName} has left the chat");

            await base.OnDisconnectedAsync(exception);
            await UpdateUserList();
        }

        private Task UpdateUserList() 
        { 
            var users = ConnectedUsers.Values.ToList(); 
            return Clients.All.SendAsync("UpdateUserList", users); 
        }

        public async Task Broadcast(string user, string message)
        {
            Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendPrivate(string fromUser, string toUser, string message)
        {
           // string fromUserConnectionID = ConnectedUsers.FirstOrDefault(x => x.Value == ToUser).Key;
            string toUserConnectionID = ConnectedUsers.FirstOrDefault(x => x.Value == toUser).Key;

            //var fromClient = Clients.Client(fromUserConnectionID);
            var toClient = Clients.Client(toUserConnectionID);

            //await fromClient.SendAsync("ReceiveMessage", FromUser, message);
            await toClient.SendAsync("ReceiveMessage", fromUser, message);
            await Clients.Caller.SendAsync("PrivateMessageDelivered", toUser);
        }
    }
}
